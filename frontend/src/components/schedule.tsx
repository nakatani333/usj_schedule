import * as React from 'react'
import styled from 'styled-components'

const ScheduleWrapper = styled.div`
  width: 300px;
`
const Schedule = styled.div`
  background: #ffffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  width: 300px;
`

// const ScheduleImg = styled.img`
// border-radius: 5px 5px 0 0;
//   max-width: 100%;
//   height: auto;
// }
// `

const ScheduleContent = styled.div`
padding: 8px 20px 20px;
`

const ScheduleTitle = styled.p`
font-size: 1.3em;
  color: #333;
  font-weight: 700;
`

const ScheduleText = styled.p`
color: #777;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0.2em;
`

interface Props {
  title: string
  area: string
}

export const Schedules: React.FC<Props> = (props) => (
  <>
    <ScheduleWrapper>
      <Schedule>
        {/* <ScheduleImg src="https://dubdesign.net/wp-content/uploads/2020/05/0508_dtplayouteyecatch.jpg" alt="" /> */}
        <ScheduleContent>
          <ScheduleTitle>{props.title}</ScheduleTitle>
          <ScheduleText>{props.area}</ScheduleText>
        </ScheduleContent>
      </Schedule>
    </ScheduleWrapper>
  </>
)
