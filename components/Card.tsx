import React from 'react'

interface CardProps {
  title?: string
  description?: string
  image?: string
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
}

export function Card({ 
  title, 
  description, 
  image, 
  children, 
  className = '',
  variant = 'default'
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg overflow-hidden transition-all duration-200'
  
  const variants = {
    default: 'shadow-sm hover:shadow-md',
    elevated: 'shadow-lg hover:shadow-xl',
    outlined: 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
  }
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={title || 'Card image'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-gray-50 bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}
