import React, { useState } from 'react'
import styled from "styled-components";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { IMAGES } from '../../assets/data/carData';

function Carousel() {
    const [[imageCount, direction], setImageCount] = useState([0, 0])

    const activeImageIndex = wrap(0, IMAGES.length, imageCount)

    const swipeToImage = swipeDirection => {
        setImageCount([imageCount + swipeDirection, swipeDirection])
    }

    const dragEndHandler = dragInfo => {
        const draggedDistance = dragInfo.offset.x
        const swipeThreshold = 50
        if (draggedDistance > swipeThreshold) {
            swipeToImage(-1)
        } else if (draggedDistance < -swipeThreshold) {
            swipeToImage(1)
        }
    }

    const skipToImage = imageId => {
        let changeDirection
        if (imageId > activeImageIndex) {
            changeDirection = 1
        } else if (imageId < activeImageIndex) {
            changeDirection = -1
        }
        setImageCount([imageId, changeDirection])
    }

    const sliderVariants = {
        incoming: direction => ({
            x: direction > 0 ? "100%" : "-100%",
            scale: 1.2,
            opacity: 0
        }),
        active: { x: 0, scale: 1, opacity: 1 },
        exit: direction => ({
            x: direction > 0 ? "-100%" : "100%",
            scale: 1,
            opacity: 0.2
        })
    }

    const sliderTransition = {
        duration: 1,
        ease: [0.56, 0.03, 0.12, 1.04]
    }
    return (
        <Main>
            <div className="slider-container">
                <div className="slider">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={imageCount}
                            style={{
                                backgroundImage: `url(${IMAGES[activeImageIndex].imageSrc})`
                            }}
                            custom={direction}
                            variants={sliderVariants}
                            initial="incoming"
                            animate="active"
                            exit="exit"
                            transition={sliderTransition}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                            className="image"
                        />
                    </AnimatePresence>
                </div>

                {/* <div className="buttons">
                    <button onClick={() => swipeToImage(-1)}>PREV</button>
                    <button onClick={() => swipeToImage(1)}>NEXT</button>
                </div> */}
            </div>

            <div className="thumbnails">
                {IMAGES.map(image => (
                    <div
                        key={image.id}
                        onClick={() => skipToImage(image.id)}
                        className="thumbnail-container"
                    >
                        <img src={image.imageSrc} alt="Musician" />
                        <div
                            className={`active-indicator ${image.id === activeImageIndex ? "active" : null
                                }`}
                        />
                    </div>
                ))}
            </div>
        </Main>
    )
}

export default Carousel

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 991px) {
    margin-bottom: 20px;
  }

.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  
  .slider {
    position: relative;
    height: 500px;
    width: 470px;
    overflow: hidden; 
    border-radius  : 10px;

    @media only screen and (max-width: 555px) {
      height: 400px;
      width: 350px;
    }

    @media only screen and (max-width: 375px) {
      height: 400px;
      width: 300px;
    }

    .image {
      position: absolute;
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      will-change: transform, opacity;
  
      &:hover {
        cursor: grab;
      }
  
      &:active {
        cursor: grabbing;
      }
    }
  }

  .buttons {
    margin-top: 12px;

    button {
      outline: none;
      border: none;
      user-select: none;
      padding: 10px 12px;
      transform: skewY(-5deg) rotate(5deg);
      background-color: $grey;
      font-family: inherit;
      font-size: inherit;
      color: white;
      transition: .07s ease-out transform;

      &:first-of-type {
        margin-right: 15px;
      }

      &:hover {
        cursor: pointer;
      }

      &:active {
        transform: scale(.85) skewY(-5deg) rotate(5deg);
      }
    }
  }   
}

.thumbnails {
  display: flex;
  justify-content: center;
  
  .thumbnail-container {
    position: relative;
    height: 120px;
    width: 90px;    

    @media only screen and (max-width: 555px) {
      height: 70px;
      width: 65px;
    }

    @media only screen and (max-width: 375px) {
      height: 70px;
      width: 50px;
    }

    &:hover {
      cursor: pointer;
    }

    &:not(:last-of-type) {
      margin-right: 5px;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 10px;
    }

    .active-indicator {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: none;
      transform: scaleX(0);
      transform-origin: left;
      background-color: #0000007f;
      border-radius  : 10px;
      transition: 1s cubic-bezier(0.56, 0.03, 0.12, 1.04) transform;

      &.active {
        transform: scaleX(1);
      }
    }
  }
}
`