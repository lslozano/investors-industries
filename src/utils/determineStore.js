// This function helps us determine what storage to use as our store
export default function determineStore(localStorage, sessionStorage) {
  if (sessionStorage === null) return localStorage

  return sessionStorage
}