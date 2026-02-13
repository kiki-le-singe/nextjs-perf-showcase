import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type BackToProps = {
  href?: string
  text?: string
  className?: string
  iconPosition?: 'left' | 'right'
}

export default function BackTo({
  href = '/',
  text = 'Back to Home',
  className = 'inline-flex items-center text-blue-600 hover:text-blue-800 mb-8',
  iconPosition = 'left',
}: BackToProps) {
  return (
    <Link href={href} className={className}>
      {iconPosition === 'left' && <ChevronLeft className="w-4 h-4 mr-2" />}
      {text}
      {iconPosition === 'right' && <ChevronRight className="w-4 h-4 ml-2" />}
    </Link>
  )
}
