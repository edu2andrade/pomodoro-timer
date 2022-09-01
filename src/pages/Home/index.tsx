import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

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
  const { createNewCycle, stopCycle, activeCycle } = useContext(CyclesContext)
  // React Hook Form ↓
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={stopCycle} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Play
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
