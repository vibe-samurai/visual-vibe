'use client'
export default function ForgotPassword() {
  return <div>Forgot password</div>
  /*const [isOpen, setIsOpen] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')

  return (
    <Card padding={'24px'} className={s.cardWrapper}>
      <Typography as={'h1'} className={s.titleText} variant={'h1'}>
        Forgot Password
      </Typography>
      <ForgotPasswordForm setIsOpen={setIsOpen} watchEmail={setRecoveryEmail} />
      <Dialog
        className={s.dialogButton}
        title={'Email sent'}
        size={'sm'}
        open={isOpen}
        onConfirmButtonClick={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        confirmButtonText={'OK'}
      >
        We have sent a link to confirm your email to {recoveryEmail}.
      </Dialog>
    </Card>
  )*/
}
