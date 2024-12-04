interface SelectComponentProps {
    selectedTag: string;
    onTagChange: (tag: string) => void;
  }
  
export function SelectComponent ({ selectedTag, onTagChange }: SelectComponentProps) {
  const tags = ["Indumentaria", "Calzado", "Tecnologia", "Marketing", "Comida"]
  
  return (
      <div className="flex flex-col gap-2">
        <p className="font-medium tracking-tight">Categoría</p>
        <select
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="p-2 border border-solid rounded-md dark:bg-zinc-100/5 dark:text-white"
        >
          <option value="">Selecciona una categoría</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
  )
}
