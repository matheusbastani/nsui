import React from 'react'
import { useNSUI } from '@nsui/provider'
import { useRipple } from '@nsui/ripple'
import '@nsui/ripple/ripple.css'

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'prefix' | 'className' | 'style'
> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  classNames?: { root?: string; children?: string; prefix?: string; suffix?: string }
  styles?: {
    root?: React.CSSProperties
    children?: React.CSSProperties
    prefix?: React.CSSProperties
    suffix?: React.CSSProperties
  }
  isRippleDisabled?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, prefix, suffix, classNames, styles, disabled, isRippleDisabled, onClick, ...props },
    ref
  ) => {
    const { global, components } = useNSUI()

    const transitionDuration = components?.button?.transitionDuration ?? global.transitionDuration
    const isRippleDisabledFinal = isRippleDisabled ?? components?.button?.isRippleDisabled

    const { createRipple } = useRipple()

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!isRippleDisabledFinal && !disabled) createRipple(e)
      onClick?.(e)
    }

    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        className={`${global.prefixCls}-btn ${classNames?.root ?? ''}`}
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          gap: '0.2rem',
          padding: '0.5rem',
          transition: 'all ease-in-out',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transitionDuration: `${transitionDuration}ms`,
          ...styles?.root
        }}
      >
        {prefix && (
          <span
            className={`${global.prefixCls}-btn-left ${classNames?.prefix ?? ''}`}
            style={styles?.prefix}
          >
            {prefix}
          </span>
        )}

        <span
          className={`${global.prefixCls}-btn-content ${classNames?.children ?? ''}`}
          style={styles?.children}
        >
          {children}
        </span>

        {suffix && (
          <span
            className={`${global.prefixCls}-btn-right ${classNames?.suffix ?? ''}`}
            style={styles?.suffix}
          >
            {suffix}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
