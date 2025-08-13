import * as React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
  width: 300px;
`
const Card = styled.div`
  background: #ffffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  width: 300px;
`

const CardImg = styled.img`
border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}
`

const CardContent = styled.div`
padding: 8px 20px 20px;
`

const CardTitle = styled.p`
font-size: 1.3em;
  color: #333;
  font-weight: 700;
`

const CardText = styled.p`
color: #777;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0.2em;
`

interface Props {
  title: string
  // Reactがjsx内で扱える要素（タグやテキスト、null など）の型
  area: string
}

export const Cards: React.FC<Props> = (props) => (
  <>
    <CardWrapper>
      <Card>
        <CardImg src="https://dubdesign.net/wp-content/uploads/2020/05/0508_dtplayouteyecatch.jpg" alt="" />
        <CardContent>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.area}</CardText>
        </CardContent>
      </Card>
    </CardWrapper>
  </>
)
