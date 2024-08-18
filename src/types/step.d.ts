type StepDetailsList = {
  title: string
  items: string[]
}

type StepDetails = {
  title: string
  guidelines: StepDetailsList
  rules: StepDetailsList
}

type StepAction = {
  label: string
  onClick: () => void
}
type Step = {
  title: string
  done: boolean
  details: StepDetails
  action?: StepAction
}
