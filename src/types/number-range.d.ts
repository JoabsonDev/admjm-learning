type NumberRange<
  N extends number,
  Result extends Array<unknown> = []
> = Result["length"] extends N
  ? Result[number]
  : NumberRange<N, [...Result, Result["length"]]>
