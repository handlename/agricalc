import React, { useId, useRef } from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";

export const ResetButton: React.FC = () => {
  const { dispatch } = useGame();
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleConfirm = () => {
    dispatch({ type: "RESET_ALL" });
    closeDialog();
  };

  return (
    <>
      <button className="btn-secondary" onClick={openDialog} type="button">
        {t("resetAll")}
      </button>
      {/* ネイティブ <dialog>: フォーカス閉じ込め・Esc で閉じる・閉じた後のフォーカス復帰をブラウザが担う */}
      <dialog ref={dialogRef} className="confirm-dialog" aria-labelledby={titleId}>
        <p id={titleId} className="confirm-dialog-title">
          {t("resetConfirm")}
        </p>
        <div className="confirm-dialog-actions">
          <button
            className="btn-secondary"
            onClick={closeDialog}
            type="button"
            autoFocus
          >
            {t("cancel")}
          </button>
          <button className="btn-danger" onClick={handleConfirm} type="button">
            {t("resetAll")}
          </button>
        </div>
      </dialog>
    </>
  );
};
