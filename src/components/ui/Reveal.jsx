import { motion, useReducedMotion } from 'framer-motion'

/** Apparition douce au défilement. Désactivée si l'utilisateur préfère réduire les animations. */
export default function Reveal({ as = 'div', delay = 0, y = 18, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
