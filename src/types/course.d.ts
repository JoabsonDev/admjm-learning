type FileRef = {
  ref: string
  url: string
}

type Lecture = {
  id: string
  lessonId?: string
  video: FileRef
  title: string
  duration: string
  completed?: boolean //TODO: trazer isso dinamico por aluno. Não é um dado direto do curso, será temporário na visão do aluno
}
type Lesson = {
  id: string
  title: string
  duration?: string
  lectures: Lecture[]
}
type Course = {
  id: string
  title: string
  description: string
  thumbnail: FileRef
  price?: number
  duration?: string //TODO: será dinâmico baseado no calculo das durations das lectures
  rate: RatingSize //TODO: baseado na votação de todos os alunos se extrai a média. Não é um dado direto do curso, será temporário na visão do aluno
  lessons?: Lesson[]
  alreadyPurchased?: boolean //TODO: trazer isso dinamico por aluno. Não é um dado direto do curso, será temporário na visão do aluno
}
