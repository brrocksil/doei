export const categoryColors = {
  moveis: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  eletronicos: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
  roupas: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-200" },
  livros: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", border: "border-fuchsia-200" },
  musica: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
  esportes: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  infantil: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
  transporte: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-200" },
  pets: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", border: "border-fuchsia-200" },
  cozinha: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
  arte: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  outros: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
}

export const getColorForCategory = (category: string) => {
  const normalizedCategory = category.toLowerCase();
  return categoryColors[normalizedCategory] || categoryColors.outros;
}

