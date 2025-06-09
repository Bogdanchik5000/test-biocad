type ValidationResult = {
  error: string;
  valid: boolean;
};

const ALLOWED_REGEX = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

export function validateSequence(value: string, compareLength?: number): ValidationResult {
  if (!value) {
    return { error: "Обязательное поле", valid: false };
  }

  if (!ALLOWED_REGEX.test(value)) {
    return {
      error:
        "Можно использовать только допустимые буквы (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и -",
      valid: false,
    };
  }

  if (compareLength !== undefined && value.length !== compareLength) {
    return { error: "Длины последовательностей должны совпадать", valid: false };
  }

  return { error: "", valid: true };
}
