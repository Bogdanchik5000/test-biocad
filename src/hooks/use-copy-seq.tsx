import { useCallback, useEffect, type RefObject } from "react";
import { toast } from "react-toastify";

export function useCopySeq(
  seq1Ref: RefObject<HTMLDivElement | null>,
  seq2Ref: RefObject<HTMLDivElement | null>
) {
  const handleCopy = useCallback(() => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText && seq1Ref.current && seq2Ref.current) {
      const anchorNode = selection?.anchorNode;
      const focusNode = selection?.focusNode;

      const isInSeq1 =
        anchorNode &&
        seq1Ref.current.contains(anchorNode) &&
        focusNode &&
        seq1Ref.current.contains(focusNode);
      const isInSeq2 =
        anchorNode &&
        seq2Ref.current.contains(anchorNode) &&
        focusNode &&
        seq2Ref.current.contains(focusNode);

      if ((isInSeq1 && !isInSeq2) || (isInSeq2 && !isInSeq1)) {
        navigator.clipboard
          .writeText(selectedText)
          .then(() => {
            toast.success("Выделенный текст скопирован!", {
              position: "top-right",
              autoClose: 1000,
            });
          })
          .catch((err) => {
            console.error("Ошибка при копировании:", err);
            toast.error("Не удалось скопировать текст", {
              position: "top-right",
              autoClose: 1000,
            });
          });
      }
    }
  }, [seq1Ref, seq2Ref]);

  useEffect(() => {
    document.addEventListener("mouseup", handleCopy);
    document.addEventListener("touchend", handleCopy);

    return () => {
      document.removeEventListener("mouseup", handleCopy);
      document.removeEventListener("touchend", handleCopy);
    };
  }, [handleCopy]);
}
