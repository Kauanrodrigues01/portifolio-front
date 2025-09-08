import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Usar scroll suave se suportado pelo navegador
    const scrollOptions: ScrollToOptions = {
      top: 0,
      left: 0,
      behavior: 'smooth'
    };

    // Fallback para navegadores que não suportam scroll suave
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo(scrollOptions);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
