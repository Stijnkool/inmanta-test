import { Either } from ".";

type RemoteData<F, S> = NotAsked | Loading | Failed<F> | Success<S>;

export type Type<F, S> = RemoteData<F, S>;

interface NotAsked {
  kind: "NotAsked";
}

export const notAsked = (): NotAsked => ({ kind: "NotAsked" });

interface Loading {
  kind: "Loading";
}

export const loading = (): Loading => ({ kind: "Loading" });

interface Failed<V> {
  kind: "Failed";
  value: V;
}

export const failed = <V>(value: V): Failed<V> => ({ kind: "Failed", value });

interface Success<V> {
  kind: "Success";
  value: V;
}

export const success = <V>(value: V): Success<V> => ({
  kind: "Success",
  value,
});

export const isSuccess = <F, S>(data: RemoteData<F, S>): data is Success<S> =>
  data.kind === "Success";

export const fromEither = <L, R>(
  either: Either.Type<L, R>
): RemoteData<L, R> => {
  if (Either.isLeft(either)) {
    return failed(either.value);
  }
  return success(either.value);
};
