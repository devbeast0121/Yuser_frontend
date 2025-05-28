import React from "react";
import {
  MainContainer,
  ContentBox,
  Title,
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
  StoreImage,
  StoreDiv,
} from "./LandingImageComponent.elements";
import { inject, observer } from "mobx-react";
import Link from "next/link";
import Image from "next/image";
import { SPACING } from "../../styles/Styling.js";

export default inject("store")(
  observer(function LandingImageComponent(props) {
    const imageHeight = !props.standardTitleLogoSize ? 35 : 20;
    const imageWidth = !props.standardTitleLogoSize ? 190 : 170;
    const imageMargindescription2Bottom = !props.standardTitleLogoSize ? 0 : 7;

    return (
      <MainContainer>
        <ContentBox
          textMarginLeft={props.textMarginLeft}
          textMarginRight={props.textMarginRight}
          reverse={props.reverse}
          mobileReverse={props.mobileReverse}
        >
          {props.srcTitle != null && (
            <Image
              height="50px"
              width="200px"
              layout="fixed"
              objectFit="contain"
              src={props.srcTitle}
              alt={props.srcTitle}
            />
          )}
          {props.title1 && (
            <Title fontSize={props.title1FontSize}>{props.title1}</Title>
          )}
          {props.title2 && (
            <Title fontSize={props.title2FontSize}>{props.title2}</Title>
          )}
          {props.title3 && (
            <Title fontSize={props.title3FontSize}>{props.title3}</Title>
          )}
          {props.description1 ||
          props.description2 ||
          props.description2 ||
          props.table ? (
            <DescriptionContainer>
              {props.table ? (
                <List
                  style={{
                    paddingLeft: props.listStyle ? 30 : 0,
                    order: 3,
                    listStyleType: props.listStyle ? "disc" : "none",
                  }}
                >
                  {props.legends ? (
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
                <MultiDescription style={{ flexDirection: "column", alignSelf:"flex-end" }}>
                  {props.description1 ? (
                    <Description fontSize={props.description1FontSize}>
                      {props.description1}
                    </Description>
                  ) : null}
                  {props.description2 ? (
                    <Description fontSize={props.description2FontSize}>
                      {props.description2}
                    </Description>
                  ) : null}
                  {props.description3 ? (
                    <Description fontSize={props.description3FontSize}>
                      {props.description3}
                    </Description>
                  ) : null}
                </MultiDescription>
              ) : null}
            </DescriptionContainer>
          ) : null}
          {props.storeButtons && (
            <>
              <StoreDiv>
                <StoreImage
                  src={
                    "https://yuser-assets.imgix.net/appleStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                  }
                  alt="apple"
                />
                <StoreImage
                  src={
                    "https://yuser-assets.imgix.net/googlePlayStore.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
                  }
                  alt="apple"
                />
              </StoreDiv>
            </>
          )}
          {props.leftButton ? (
            <ButtonsBox>
              {props.leftButton ? (
                <ButtonLink
                  left={true}
                  onClick={() => {
                    props.setOpenSignUp(true);
                  }}
                >
                  <BtnText>
                    {props.leftButton}  
                  </BtnText>
                </ButtonLink>
              ) : null}
              {/* {props.rightHref ?
                                <ButtonLink >
                                    <Link href={props.rightHref} passHref>
                                        <BtnText>{props.rightButton}</BtnText>
                                    </Link>
                                </ButtonLink>
                                : null} */}
            </ButtonsBox>
          ) : null}
        </ContentBox>

        <ImageBox
          mobileMargin={props.mobileMargin}
          style={{ maxWidth: 500 }}
          reverse={props.reverse}
          mobileReverse={props.mobileReverse}
        >
          <ItemImage
            reverse={props.reverse}
            objectFit="contain"
            src={props.src}
          />
        </ImageBox>
      </MainContainer>
    );
  })
);