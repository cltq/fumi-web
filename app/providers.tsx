"use client";

import { style, dataStyle } from "@/resources/once-ui.config";
import { iconLibrary } from "@/resources/icons";
import {
  ThemeProvider,
  DataThemeProvider,
  IconProvider,
  ToastProvider,
  LayoutProvider,
  type BorderStyle,
  type NeutralColor,
  type ScalingSize,
  type Schemes,
  type SolidStyle,
  type SolidType,
  type SurfaceStyle,
  type TransitionStyle,
  type Theme,
  type ChartVariant,
  type ChartMode,
} from "@once-ui-system/core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider
      breakpoints={{
        s: 640,
        m: 1024,
        l: 1200,
      }}
    >
      <ThemeProvider
        theme={style.theme as Theme}
        brand={style.brand as Schemes}
        accent={style.accent as Schemes}
        neutral={style.neutral as NeutralColor}
        solid={style.solid as SolidType}
        solidStyle={style.solidStyle as SolidStyle}
        border={style.border as BorderStyle}
        surface={style.surface as SurfaceStyle}
        transition={style.transition as TransitionStyle}
        scaling={style.scaling as ScalingSize}
      >
        <DataThemeProvider
          variant={dataStyle.variant as ChartVariant}
          mode={dataStyle.mode as ChartMode}
          height={dataStyle.height}
          axis={{
            stroke: dataStyle.axis.stroke,
          }}
          tick={{
            fill: dataStyle.tick.fill,
            fontSize: dataStyle.tick.fontSize,
            line: dataStyle.tick.line,
          }}
        >
          <ToastProvider>
            <IconProvider icons={iconLibrary}>{children}</IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
