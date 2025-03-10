const CloseIcon = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      fill={'none'}
      height={size}
      stroke={color}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={'2'}
      viewBox={'0 0 24 24'}
      width={size}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <line x1={'18'} x2={'6'} y1={'6'} y2={'18'} />
      <line x1={'6'} x2={'18'} y1={'6'} y2={'18'} />
    </svg>
  )
}

export default CloseIcon
