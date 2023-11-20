export type ListFetchingError = { status: number; message: string; };

type InitialState = {
  state: "initial";
};
type LoadingState = {
  state: "loading";
};
type SuccessState<T> = {
  state: "success";
  result: T[];
};
type ErrorState = {
  state: "error";
  error: ListFetchingError;
};
export type ComponentListState<T> = 
  | InitialState
  | LoadingState
  | SuccessState<T> 
  | ErrorState;
