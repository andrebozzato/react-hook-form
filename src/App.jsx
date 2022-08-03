import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './styles/App.module.scss'

const schema = yup
  .object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup
      .string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 digitos')
      .required('O senha é obrigatória'),
    confirmPassword: yup
      .string()
      .required('A confirmação de senha é obrigatória')
      .oneOf([yup.ref('password')], 'As senhas estão diferentes ')
  })
  .required()

export function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  function userSubmit(userData) {
    console.log(userData)
  }

  console.log(watch('name'))

  return (
    <div className={styles.container}>
      <div>
        <h1>Formulario em react</h1>
        <form onSubmit={handleSubmit(userSubmit)}>
          <label htmlFor="">
            Nome
            <input type="text" {...register('name', { required: true })} />
            {<span>{errors.name?.message}</span>}
          </label>

          <label htmlFor="">
            Email
            <input type="text" {...register('email')} />
            {<span>{errors.email?.message}</span>}
          </label>

          <label htmlFor="">
            Senha
            <input type="password" {...register('password')} />
            {<span>{errors.password?.message}</span>}
          </label>

          <label htmlFor="">
            Confirmar senha
            <input type="password" {...register('confirmPassword')} />
            {<span>{errors.confirmPassword?.message}</span>}
          </label>

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  )
}
