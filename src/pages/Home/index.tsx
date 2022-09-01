import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

/**
 * Controlled: (re-renders the interface every state change)
 * --> Save the user input state in real time in our app.
 * - re-renders the interface every state change.
 * - more control (every typed digit is save, wacth), less performance.
 * - onChange={(e) => setTask(e.target.value)}, and value={task}
 *
 * Uncontrolled:
 * --> Fecth the info input only when we need it.
 * - less control, more performance.
 * - function handleSubmit(), for example
 */

// Validations with zod ↓
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Task description is mandatory'),
  minutesAmount: zod
    .number()
    .min(5, 'Task duration must be equal or greater than 5 minutes.')
    .max(60, 'Task duration must be equal or less than 60 minutes.'),
})

// ↓ type infer from zod schema.
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
// Don't need this ↓
// type NewCycleFormData = {
//   task: string
//   minutesAmount: number
// }

export function Home() {
  const { register, handleSubmit, watch, reset /** formState */ } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    // ↓ reset to default values
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Task:</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Name it!"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutesAmount">Time:</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            /** ↓ Validations with HTML */
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Play
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
