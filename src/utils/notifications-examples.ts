// Exemplos de uso do sistema de notificações
// import { notify, confirm, alert } from '../utils/notifications'

// ===== TOASTR NOTIFICATIONS =====
/*
// Sucesso
notify.success('Usuário criado com sucesso!')
notify.success('Configurações salvas!')

// Erro
notify.error('Erro ao carregar dados')
notify.error('Falha na autenticação')

// Aviso
notify.warning('Sessão expira em 5 minutos')
notify.warning('Alguns campos estão incompletos')

// Informação
notify.info('Nova versão disponível')
notify.info('Backup realizado automaticamente')
*/

// ===== SWEET ALERT CONFIRMATIONS =====

/*
// Confirmar exclusão
const deleteUser = async (userName: string) => {
  const confirmed = await confirm.delete(`o usuário "${userName}"`)
  if (confirmed) {
    // Executar exclusão
    console.log(`Excluindo usuário ${userName}`)
    notify.success('Usuário excluído com sucesso!')
  }
}

// Confirmar publicação
const publishPost = async () => {
  const confirmed = await confirm.default(
    'Publicar post?',
    'Uma vez publicado, o post ficará visível para todos os usuários.'
  )
  if (confirmed) {
    // Publicar
    console.log('Publicando post...')
    notify.success('Post publicado!')
  }
}

// Ação perigosa
const resetDatabase = async () => {
  const confirmed = await confirm.warning(
    'Resetar banco de dados?',
    'Esta ação irá remover todos os dados e não pode ser desfeita.'
  )
  if (confirmed) {
    // Resetar banco
    console.log('Resetando banco...')
  }
}
*/

// ===== SWEET ALERT INFORMATIVE ALERTS =====

/*
// Sucesso (quando precisa de mais atenção que um toast)
const showSuccessDialog = async () => {
  await alert.success(
    'Parabéns!',
    'Sua conta foi verificada com sucesso.'
  )
}

// Erro importante
const showErrorDialog = async () => {
  await alert.error(
    'Falha crítica',
    'Não foi possível conectar ao servidor. Tente novamente mais tarde.'
  )
}

// Informação importante
const showInfoDialog = async () => {
  await alert.info(
    'Manutenção programada',
    'O sistema ficará indisponível das 02:00 às 04:00 para manutenção.'
  )
}
*/

// ===== SWEET ALERT INFORMATIVE ALERTS =====

/*
// Sucesso (quando precisa de mais atenção que um toast)
const showSuccessDialog = async () => {
  await alert.success(
    'Parabéns!',
    'Sua conta foi verificada com sucesso.'
  )
}

// Erro importante
const showErrorDialog = async () => {
  await alert.error(
    'Falha crítica',
    'Não foi possível conectar ao servidor. Tente novamente mais tarde.'
  )
}

// Informação importante
const showInfoDialog = async () => {
  await alert.info(
    'Manutenção programada',
    'O sistema ficará indisponível das 02:00 às 04:00 para manutenção.'
  )
}
*/

// ===== EXEMPLOS EM COMPONENTES REACT =====

/*
export const ExampleComponent = () => {
  const handleSave = async () => {
    try {
      // Simula salvamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      notify.success('Dados salvos com sucesso!')
    } catch (error) {
      notify.error('Erro ao salvar dados')
    }
  }

  const handleDelete = async () => {
    const confirmed = await confirm.delete('este item')
    if (confirmed) {
      try {
        // Simula exclusão
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        notify.success('Item excluído com sucesso!')
      } catch (error) {
        notify.error('Erro ao excluir item')
      }
    }
  }

  const handleImportantAction = async () => {
    const confirmed = await confirm.warning(
      'Ação irreversível',
      'Esta ação não pode ser desfeita. Tem certeza que deseja continuar?'
    )
    
    if (confirmed) {
      // Executar ação
      notify.info('Processando...')
    }
  }

  return (
    <div>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={handleDelete}>Excluir</button>
      <button onClick={handleImportantAction}>Ação Importante</button>
    </div>
  )
}
*/
