import React from "react";
import {
  MainContainer,
  ContentBox,
  Title,
  TitleWrapper,
  DescriptionContainer,
  Description,
  ButtonsBox,
  ImageBox,
  ItemImage,
  ButtonLink,
  BtnText,
  Item,
  MultiDescription,
  ItemCondition,
  List,
  SubTitle,
  BottomButtonBox,
  ItemImageTwo,
  LogoContainer
} from "./ImageContentComponent.elements";
import { inject, observer } from "mobx-react";
import Link from "next/link";
import Image from "next/image";
import { COLORS } from "../../styles/Styling";
import { motion, AnimatePresence } from "framer-motion";

export default inject("store")(
  observer(function ImageContentComponent(props) {
    return (
      <MainContainer
        direction={props.direction}
        doubleImage={props.doubleImage}
        className="Flex"
      >
        <ContentBox
          textMarginLeft={props.textMarginLeft}
          textMarginRight={props.textMarginRight}
          textMaxWidth={props.textMaxWidth}
          reverse={props.reverse}
          mobileReverse={props.mobileReverse}
          direction={props.direction}
        >
          {props.srcTitle != null && (
            <LogoContainer>
            <Image
              height={props.logoHeight}
              width={props.logoWidth}
           
              objectFit="contain"
              src={props.srcTitle}
              alt={props.srcTitle}
            />
            </LogoContainer>
          )}
          {props.title1 && (
            <TitleWrapper
              fontSize={props.title1FontSize}
              direction={props.direction}
            >
              <Title>{props.title1}</Title>
            </TitleWrapper>
          )}
          {props.title2 && (
            <TitleWrapper
              fontSize={props.title2FontSize}
              direction={props.direction}
            >
              <Title>{props.title2}</Title>
            </TitleWrapper>
          )}
          {props.title3 && (
            <TitleWrapper
              fontSize={props.title3FontSize}
              direction={props.direction}
            >
              <Title>{props.title3}</Title>
            </TitleWrapper>
          )}
          {props.subTitle && (
            <SubTitle
              subTitleColor={props.subTitleColor}
              fontSize={props.subTitleFontSize}
              direction={props.direction}
            >
              {props.subTitle}
            </SubTitle>
          )}
          {props.description1 ||
          props.description2 ||
          props.description2 ||
          props.table ? (
            <DescriptionContainer>
              {props.table ? (
                <List
                  style={{
                    marginTop:24,
                    paddingLeft: props.listStyle ? 30 : 0,
                    order: 3,
                    listStyleType: props.listStyle ? "disc" : "none",
                  }}
                >
                  {props.table ? (
                    <>
                      {props.tableData.map((item, index) => (
                        <ItemCondition
                          fontSize={props.listFontSize}
                          legends={props.legends}
                          key={index}
                          italic={true}
                        >
                          {item}
                        </ItemCondition>
                      ))}
                    </>
                  ) : (
                    <>
                      {props.tableData.map((item, index) => (
                        <Item
                          fontSize={props.listFontSize}
                          legends={props.legends}
                          key={index}
                        >
                          {item}
                        </Item>
                      ))}
                    </>
                  )}
                </List>
              ) : null}
              {props.description1 ||
              props.description2 ||
              props.description2 ? (
                <MultiDescription
                  fontSize={props.descriptionFontSize}
                  style={{ flexDirection: "column" }}
                >
                  {props.description1 ? (
                    <Description
                      direction={props.direction}
                      descriptionColor={props.descriptionColor}
                    >
                      {props.description1}
                    </Description>
                  ) : null}
                  {props.description2 ? (
                    <Description
                      direction={props.direction}
                      descriptionColor={props.descriptionColor}
                    >
                      {props.description2}
                    </Description>
                  ) : null}
                  {props.description3 ? (
                    <Description
                      direction={props.direction}
                      descriptionColor={props.descriptionColor}
                    >
                      {props.description3}
                    </Description>
                  ) : null}
                  {props.description4 ? (
                    <Description
                      direction={props.direction}
                      descriptionColor={props.descriptionColor}
                    >
                      {props.description4}
                    </Description>
                  ) : null}
                </MultiDescription>
              ) : null}
            </DescriptionContainer>
          ) : null}
          {props.leftHref || props.rightHref ? (
            <ButtonsBox direction={props.direction}>
              {props.leftHref ? (
                <ButtonLink
                  left={true}
                  leftButtonColor={props.leftButtonColor}
                  onClick={props.openVideo}
                  className="Flex"
                  as={motion.button}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  whileHover={{ scale: 1.02, }}
                  whileTap={{ scale: 0.98, }}
                >
                  <BtnText>{props.leftButton}</BtnText>
                </ButtonLink>
              ) : null}
              {props.rightHref ? (
                <ButtonLink
                  rightButtonColor={props.rightButtonColor}
                  className="Flex"
                  as={motion.button}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  whileHover={{ scale: 1.02, }}
                  whileTap={{ scale: 0.98, }}
                >
                  <Link href={props.rightHref} passHref>
                    <BtnText>
                      {props.rightButton}
                    </BtnText>
                  </Link>
                </ButtonLink>
              ) : null}
            </ButtonsBox>
          ) : null}
        </ContentBox>

        <ImageBox
          mobileMargin={props.mobileMargin}
          style={{ maxWidth: props.imageMaxWidth ? props.imageMaxWidth : 450 }}
          reverse={props.reverse}
          mobileReverse={props.mobileReverse}
          direction={props.direction}
        >
          <ItemImage
            reverse={props.reverse}
            objectFit="cover"
            src={props.src}
            direction={props.direction}
            mobileMargin={props.mobileMargin}
          />
        </ImageBox>
        {props.bottomHref ? (
          <BottomButtonBox>
            {props.bottomHref ? (
              <ButtonLink
                left={true}
                leftButtonColor={props.bottomButtonColor}
                onClick={props.openVideo}
                as={motion.button}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                whileHover={{ scale: 1.02, }}
                whileTap={{ scale: 0.98, }}
              >
                <BtnText>{props.bottomButton}</BtnText>
              </ButtonLink>
            ) : null}
          </BottomButtonBox>
        ) : null}
      </MainContainer>
    );
  })
);
