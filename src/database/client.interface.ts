/**
 * Interface for a database client.
 */
export interface IDatabaseClient {
  /**
     * Connects to the database.
     * @returns A promise that resolves when the connection is successful.
     */
  connect: () => Promise<void>

  /**
     * Ends the database connection.
     * @returns A promise that resolves when the connection is closed.
     */
  end: () => Promise<void>

  /**
     * Executes a database query.
     * @param query - The query string to execute.
     * @returns A promise that resolves with the query result.
     */
  query: (query: string) => Promise<any>
}
