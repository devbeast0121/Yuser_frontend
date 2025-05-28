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
  StickerColumn1,
  StickerColumn2,
  StickerColumn3,
  StickerBox1,
  StickerBox2,
  StickerBox3,
  StickerBox4,
  StickerBox5,
  StickerBox6,
  StickerTitle1,
  StickerTitle2,
  StickerTitle3,
  StickerTitle4,
  StickerTitle5,
  StickerTitle6,
  StickerSubtitle1,
  StickerSubtitle2,
  StickerSubtitle3,
  StickerSubtitle4,
  StickerSubtitle5,
  StickerSubtitle6,
  StickerImage1,
  StickerImage2,
  StickerImage3,
  StickerImage4,
  StickerImage5,
  StickerImage6,
  StickerBox
} from "./ImageContentComponent.elements";
import { inject, observer } from "mobx-react";
import Link from "next/link";
import Image from "next/image";
import { COLORS } from "../../styles/Styling";
import { motion, AnimatePresence } from "framer-motion";

export default inject("store")(
  observer(function BlockContentComponent(props) {
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
            <Image
              height={props.logoHeight}
              width={props.logoWidth}
              layout="fixed"
              objectFit="contain"
              src={props.srcTitle}
              alt={props.srcTitle}
            />
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

        <StickerBox
          mobileMargin={props.mobileMargin}
          style={{ maxWidth: props.imageMaxWidth ? props.imageMaxWidth : 450 }}
          reverse={props.reverse}
          mobileReverse={props.mobileReverse}
          direction={props.direction}
        >
            <StickerColumn1>
                <StickerBox1>
                    <StickerSubtitle1>
                        {props.StickerSubtitle1}
                    </StickerSubtitle1>
                    <StickerTitle1>
                        {props.StickerTitle1}
                    </StickerTitle1>
                    <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        style={{marginTop:'auto'}}
                    >
                        <StickerImage1
                            objectFit="cover"
                            src={props.stickerSrc1}
                        />
                    </motion.div>
                </StickerBox1>
                
                <StickerBox2>
                    <StickerSubtitle2>
                        {props.StickerSubtitle2}
                    </StickerSubtitle2>
                    <StickerTitle2>
                    {props.StickerTitle2}
                    </StickerTitle2>
                    <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        style={{marginTop:'auto'}}
                    >
                        <StickerImage2
                            objectFit="cover"
                            src={props.stickerSrc2}
                        />
                    </motion.div>
                </StickerBox2>
            </StickerColumn1>
            <StickerColumn2>
                <StickerBox3>
                    <StickerSubtitle3>
                        {props.StickerSubtitle3}
                    </StickerSubtitle3>
                    <StickerTitle3>
                    {props.StickerTitle3}
                    </StickerTitle3>
                    <motion.div
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            whileHover={{
                                scale: 1.1,
                            }}
                            style={{marginTop:'auto'}}
                        >
                        <StickerImage3
                            objectFit="cover"
                            src={props.stickerSrc3}
                        />
                    </motion.div>
                </StickerBox3>
                <StickerBox4>
                    <StickerSubtitle4>
                        {props.StickerSubtitle4}
                    </StickerSubtitle4>
                    <StickerTitle4>
                    {props.StickerTitle4}
                    </StickerTitle4>
                    <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        style={{marginTop:'auto'}}
                    >
                        <StickerImage4
                            objectFit="cover"
                            src={props.stickerSrc4}
                        />
                    </motion.div>
                </StickerBox4>
            </StickerColumn2>
            <StickerColumn3>
                <StickerBox5>
                    <StickerSubtitle5>
                        {props.StickerSubtitle5}
                    </StickerSubtitle5>
                    <StickerTitle5>
                    {props.StickerTitle5}
                    </StickerTitle5>
                    <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        style={{marginTop:'auto'}}
                    >
                        <StickerImage5
                            objectFit="cover"
                            src={props.stickerSrc5}
                        />
                    </motion.div>
                </StickerBox5>
                <StickerBox6>
                    <StickerSubtitle6>
                        {props.StickerSubtitle6}
                    </StickerSubtitle6>
                    <StickerTitle6>
                    {props.StickerTitle6}
                    </StickerTitle6>
                    <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        whileHover={{
                            scale: 1.1,
                        }}
                        style={{marginTop:'auto'}}
                    >
                        <StickerImage6
                            objectFit="cover"
                            src={props.stickerSrc6}
                        />
                    </motion.div>
                </StickerBox6>
            </StickerColumn3>
        </StickerBox>
        {props.bottomHref ? (
          <BottomButtonBox>
            {props.bottomHref ? (
              <ButtonLink
                left={true}
                leftButtonColor={props.bottomButtonColor}
                onClick={props.openVideo}
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
