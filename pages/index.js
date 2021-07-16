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

function ProfileRelationsBox(props) {
  let count = 0;
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {props.title} ({props.items.length})
            </h2>

            <ul>
              {props.items.map((item) => {
                {count++};
                if (count <= 6) {
                  return (
                    <li>
                      <a href={item.image} key={item.image}>
                        <img src={item.image} />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  )
                }
                
              })}
            </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [followers, setfollowers] = useState([]);

  const [communities, setCommunities] = useState([]);


  useEffect(() => {
    fetch('https://api.github.com/users/juunegreiros/followers')
    .then(response => response.json())
    .then(function (data) {
      const items = [];

      data.map((user) => {
        const follower = {
        title: user.login,
        image: user.avatar_url
      };
      items.push(follower);
    })

    console.log(items);
    setfollowers([...followers, ...items]);
    })
  }, [])

  const usuarioAleatorio = 'raisaspagnol';

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
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();

              const data = new FormData(e.target);

              var community = {
                title: data.get('title'),
                image: data.get('image')
              };
              
              setCommunities([...communities, community]);
            }}>
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
          <ProfileRelationsBox title="Meus seguidores" items={followers} />

          <ProfileRelationsBox title="Minhas comunidades" items={communities} />
        </div>
      </MainGrid>
    </>
  )
}
