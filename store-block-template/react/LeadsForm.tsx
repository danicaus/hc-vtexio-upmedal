import React, { FormEvent } from 'react'
// import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import Amplify, { API } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { useState } from 'react';
Amplify.configure(awsExports);

const CSS_HANDLES = ['title'] as const

interface FormLeadProps {}

const LeadsForm: StorefrontFunctionComponent<FormLeadProps> = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  
  async function handleForm(e: FormEvent) {
    e.preventDefault()

    const formData  = {
      body: {
        name: name,
        email: email,
        telephone: telephone
      }
    }

    console.log(formData);
    const apiData = await API.post('formhcupmedaldanicaus', '/leads', formData);
    console.log(apiData);
    alert('Contato cadastrado!')
  }

  return (
    <div>
      <h3>Cadastre-se e ganhe desconto de 5% na primeira compra!</h3>
      <form onSubmit={handleForm} className={`${handles.title} t-heading-2 fw3 w-100 c-muted-1 db tc`}>
        <div>
          <label htmlFor="personName">Nome</label>
          <input onChange={e => setName(e.target.value)} type="text" name="personName" required id="personName" placeholder="Digite seu nome" />
        </div>

        <div>
          <label htmlFor="personEmail">E-mail</label>
          <input onChange={e => setEmail(e.target.value)} type="email" pattern=".+@.+\.com" name="personEmail" id="personEmail" required placeholder="Digite seu email" />
        </div>

        <div>
          <label htmlFor="personTel">Telefone</label>
          <input onChange={e => setTelephone(e.target.value)} type="text" name="personTel" id="personTel" required placeholder="Digite seu telefone" />
        </div>

        <button type="submit">Eu quero!</button>
      </form>
    </div>
  )
}


// interface TitleProps {
//   title: string
// }

LeadsForm.schema = {
  title: 'editor.leadsform.title',
  description: 'editor.leadsform.description',
  type: 'object',
  properties: {
    title: {
      title: 'editor.leadsform.title.title',
      type: 'string',
      default: null,
    },
  },
}

export default LeadsForm