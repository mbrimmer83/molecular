interface NavigationProps {
  sections: { id: string; title: string }[]
  activeSection: string
  onScrollToSection: (id: string) => void
}

export default function ConceptsNavigation({
  sections,
  activeSection,
  onScrollToSection
}: NavigationProps) {
  return (
    <div className="fixed top-10 left-32 right-0 w-full flex justify-center space-x-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onScrollToSection(section.id)}
          className={`w-40 h-20 py-2 px-4 rounded-md text-center font-medium transition-colors duration-300 ${
            activeSection === section.id
              ? 'border border-blue-500 shadow-md'
              : 'border hover:border-white'
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  )
}
