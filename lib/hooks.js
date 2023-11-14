'use client';

import { useCallback, useState } from "react";

export function useToggle(initialState) {
  const [isToggled, setIsToggled] = useState(initialState);
  const toggle = useCallback(() => setIsToggled(state => !state), [setIsToggled]);

  return [isToggled, toggle];
};
