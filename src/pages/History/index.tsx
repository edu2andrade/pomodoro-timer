import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 months ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 months ago</td>
              <td>
                <Status statusColor="yellow">On going</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 months ago</td>
              <td>
                <Status statusColor="red">Not started yet</Status>
              </td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>About 2 months ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
