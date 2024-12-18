import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

export default function MarkdownWithHighlighting(props: { markdown: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{props.markdown}</ReactMarkdown>
    </div>
  )
}
