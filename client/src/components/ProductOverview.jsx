import React from 'react';
import styled from 'styled-components';

const GridParent = styled.div`
  display: grid;
  grid-template-areas:
  "new-price new-price pricing"
  "main main pricing"
  "description description pricing"
  "reviews reviews pricing";
`;

const NewPrice = styled.div`
  grid-area: new-price;
  margin: 0.5rem 0;
  color: #ed022a;
  font-weight: 700;
  font-size: 0.75rem;
`;

const Pricing = styled.div`
  grid-area: pricing;
  align-self: start;
  margin-top: 1.75rem;
`;

const Main = styled.div`
  grid-area: main;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const Description = styled.div`
  grid-area: description;
  font-size: 0.75rem;
  margin: 0.5rem 0;
  color: #484848;
`;

const Reviews = styled.div`
  grid-area: reviews;
  margin: 0.5rem 0;
  font-size: 0.75rem;
  color: #484848;

  &:hover {
    text-decoration: underline;
  }
`;

const CurrentPrice = styled.div`
  font-weight: 700;
  margin: 0.5rem 0;
  // to-do: add .00 and style
`;

const OriginalPrice = styled.div`
  font-size: 0.75rem;
  margin: 0.5rem 0;
  color: #484848;
  text-decoration: line-through;
`;

const MoneySpans = styled.span`
  font-size: 0.75rem;
  vertical-align: top;
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 0.75rem;
  height: 0.75rem;
`;


const Star = <Icon viewBox="0 -10 511.99143 511">
  <path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"/>
</Icon>;


const ProductOverview = (props) => {
  const { data } = props;
  console.log(data.reviews);

  let reviewsAverages = ((reviews) => {
    let reviewsAverages = {
      appearance: 0,
      easeOfAssembly: 0,
      overallRating: 0,
      productQuality: 0,
      valueForMoney: 0,
      worksAsExpected: 0,
    };
    let numOfReviews = reviews.length;

    data.reviews.forEach((review) => {
      for (var rating in reviewsAverages) {
        reviewsAverages[rating] += review[rating]
      }
    })
    for (var rating in reviewsAverages) {
      reviewsAverages[rating] /= numOfReviews
    }
    return reviewsAverages;
  })(data.reviews)

  let roundedUpStars = [];
  for (let i = 0; i < reviewsAverages.overallRating; i++) {
    roundedUpStars.push(Star);
  }
  let isOnSale = data.price.salePrice < data.price.originalPrice
  const dollar = <MoneySpans>$</MoneySpans>
  const cents = <MoneySpans>.99</MoneySpans>

  return (
  <GridParent>
    {isOnSale && <NewPrice>New Lower Price</NewPrice>}
    <Main theme={detailsTheme}>
      <h1>{data.title.toUpperCase()}</h1>
    </Main>
    <Description>
      <p>{data.description}{data.colors[0] && `, ${data.colors[0]}`}{data.sizes[0] && `, ${data.sizes[0]}`}</p>
    </Description>
    <Pricing>
      <CurrentPrice>{dollar}{data.price.salePrice}{cents}</CurrentPrice>
      {isOnSale && <OriginalPrice>${data.price.originalPrice}.99</OriginalPrice>}
    </Pricing>
    <Reviews>{roundedUpStars} ({data.reviews.length})</Reviews>
  </GridParent>
  );
};

export default ProductOverview;