import React, { useId, useMemo } from "react";
import { IconProps } from "./types";
import { buildIconInner, IconName } from "./iconData";

interface WoodIconProps extends IconProps {
  name: IconName;
}

/** 木製コマ風アイコンの共通レンダラー */
export const WoodIcon: React.FC<WoodIconProps> = ({ name, size = 24, className }) => {
  // useId の戻り値には ":" などが含まれるため、url(#...) で安全に参照できる形に整える
  const filterId = `wood-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const inner = useMemo(() => buildIconInner(name, filterId), [name, filterId]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      // 内容は iconData.ts の静的定義のみから生成される
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
};
