import React from 'react';
import {
    MainContainer,
    TopBox,
    MiddleBox,
    BottomBox,
    TitleText,
    NumberText,
    DataText,
    Wrapper,
    Button
} from './StatsBox.elements';
import Icon from ".././Icon/Icon";
import Aadd from '../../public/icons/a-add.svg';
import Trend from '../../public/icons/trend-up.svg';
import { inject, observer } from 'mobx-react';
import { COLORS } from '../../styles/Styling';

export default inject('store')(observer(
    function StatsBox(props) {

        const color = props.percent > 0 ? COLORS.green : props.percent < 0 ? COLORS.red : ({ theme }) => theme.textSecondary.color;
        const trend = props.percent >= 0 ? "up" : " down";
        const signBefore = props.title == "Sales" ? "$" : "";
        const signAfter = props.title == "3 Month Retention" ? "%" : "";
        let timeRange = "Yesterday";
        if(props.timeRange === "weekly"){
            timeRange = "Last Week"
        }
        else if (props.timeRange === "monthly"){
            timeRange = "Last Month";
        }
        return (
            <MainContainer>
                <TopBox>
                    <TitleText>{props.title}</TitleText>
                    <Button onClick={()=>props.onPress ? props.onPress() : null} style={{cursor:props.onPress ? "pointer" : "unset"}}>
                        <Icon
                            //strokeColor={({ theme }) => theme.iconColor.color}
                            //strokeWidth="3"
                            color={({ theme }) => theme.iconColor.color}
                            height="auto"
                            width="35px"
                            name={Aadd}
                        />
                    </Button>
                </TopBox>
                <MiddleBox>
                    <NumberText>{signBefore + props.number + signAfter}</NumberText>
                </MiddleBox>
                <BottomBox>
                    {trend === "up" ?
                        <Icon
                            strokeColor={color}
                            strokeWidth="3"
                            height="auto"
                            width="28px"
                            name={Trend}
                        />
                        :
                        <Wrapper>
                            <Icon
                                strokeColor={COLORS.red}
                                strokeWidth="3"
                                height="auto"
                                width="28px"
                                name={Trend}
                            />
                        </Wrapper>
                    }
                    <DataText style={{ paddingLeft: 4 }}>{props.percent}%</DataText>
                    <DataText>{trend}</DataText>
                    <DataText>from {timeRange}</DataText>
                </BottomBox>
            </MainContainer>
        )
    }
))
