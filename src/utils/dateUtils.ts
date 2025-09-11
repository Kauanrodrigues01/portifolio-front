/**
 * Calcula a duração entre duas datas ou entre uma data e o presente
 * @param startDate Data de início no formato "MMM YYYY" (ex: "Nov 2024")
 * @param endDate Data de fim no formato "MMM YYYY" ou "Presente"/"Present"/"Atual"
 * @returns Objeto com period formatado e duration calculada
 */
export function calculateExperienceDuration(
  startDate: string,
  endDate: string
) {
  const monthsInPortuguese = {
    Jan: "Janeiro",
    Fev: "Fevereiro",
    Mar: "Março",
    Abr: "Abril",
    Mai: "Maio",
    Jun: "Junho",
    Jul: "Julho",
    Ago: "Agosto",
    Set: "Setembro",
    Out: "Outubro",
    Nov: "Novembro",
    Dez: "Dezembro",
  };

  const monthsInEnglish = {
    Janeiro: "Jan",
    Fevereiro: "Fev",
    Março: "Mar",
    Abril: "Abr",
    Maio: "Mai",
    Junho: "Jun",
    Julho: "Jul",
    Agosto: "Ago",
    Setembro: "Set",
    Outubro: "Out",
    Novembro: "Nov",
    Dezembro: "Dez",
  };

  // Função para converter mês português para inglês
  const convertToEnglishMonth = (dateStr: string): string => {
    let converted = dateStr;
    Object.entries(monthsInEnglish).forEach(([pt, en]) => {
      converted = converted.replace(pt, en);
    });
    return converted;
  };

  // Função para converter mês inglês para português
  const convertToPortugueseMonth = (dateStr: string): string => {
    let converted = dateStr;
    Object.entries(monthsInPortuguese).forEach(([en, pt]) => {
      converted = converted.replace(en, pt);
    });
    return converted;
  };

  // Função para parsear data no formato "MMM YYYY"
  const parseDate = (dateStr: string): Date => {
    const englishDateStr = convertToEnglishMonth(dateStr);
    const [month, year] = englishDateStr.split(" ");
    const monthIndex = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ].indexOf(month);
    return new Date(parseInt(year), monthIndex, 1);
  };

  // Verificar se é data atual
  const isCurrentPosition = [
    "Presente",
    "Present",
    "Atual",
    "presente",
    "atual",
  ].includes(endDate);

  const start = parseDate(startDate);
  const end = isCurrentPosition ? new Date() : parseDate(endDate);

  // Calcular diferença em meses (LinkedIn style - inclui o mês atual)
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff + 1; // +1 para incluir o mês atual

  // Formatear duração
  let duration = "";
  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    if (years === 1) {
      duration = "1 ano";
    } else {
      duration = `${years} anos`;
    }

    if (remainingMonths > 0) {
      if (remainingMonths === 1) {
        duration += " e 1 mês";
      } else {
        duration += ` e ${remainingMonths} meses`;
      }
    }
  } else if (totalMonths === 1) {
    duration = "1 mês";
  } else if (totalMonths === 0) {
    duration = "Menos de 1 mês";
  } else {
    duration = `${totalMonths} meses`;
  }

  // Formatear período
  const startFormatted = convertToPortugueseMonth(startDate);
  const endFormatted = isCurrentPosition
    ? "Presente"
    : convertToPortugueseMonth(endDate);
  const period = `${startFormatted} - ${endFormatted}`;

  return {
    period,
    duration,
  };
}

/**
 * Processa dados de experiência para calcular automaticamente period e duration
 * @param experience Objeto de experiência com startDate e endDate
 * @returns Experiência processada com period e duration calculados
 */
export function processExperienceData(experience: any) {
  if (experience.startDate && experience.endDate) {
    const { period, duration } = calculateExperienceDuration(
      experience.startDate,
      experience.endDate
    );

    return {
      ...experience,
      period,
      duration,
    };
  }

  // Se não tiver startDate/endDate, retorna como está
  return experience;
}
