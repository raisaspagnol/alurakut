import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React, { useState, useEffect } from 'react';

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [pessoasFavoritas, setPessoasFavoritas] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/juunegreiros/followers')
    .then(response => response.json())
    .then(data => data.map((user) => {
      setPessoasFavoritas(arr => [...arr, `${user.login}`]);
    }));
  }, [])

  const usuarioAleatorio = 'raisaspagnol';

  let count = 0;

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit{function }>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"/>
              </div>

              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa?" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa?"
                  type="text"/>
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((user) => {
                {count++};
                if (count <= 6) {
                  return (
                    <li>
                      <a href={`/users/${user}`} key={user}>
                        <img src={`https://github.com/${user}.png`} />
                        <span>{user}</span>
                      </a>
                    </li>
                  )
                }
                
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((user) => {
                {count++};
                if (count <= 6) {
                  return (
                    <li>
                      <a href={`/users/${user}`} key={user}>
                        <img src={`https://github.com/${user}.png`} />
                        <span>{user}</span>
                      </a>
                    </li>
                  )
                }
                
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
