import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { AnimatePresence, motion, wrap } from "framer-motion";

const Thumbnail = React.memo(({ image, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`thumbnail-container ${isActive ? 'active-thumb' : ''}`}
    style={{ backgroundImage: `url(${image?.image})` }}
  >
    <div className={`active-indicator ${isActive ? "active" : ""}`} />
  </div>
));

const Carousel = React.memo(({ images }) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const thumbnailsRef = useRef(null);
  
  const activeImageIndex = wrap(0, images?.length, imageCount);

  useEffect(() => {
    if (!thumbnailsRef.current) return;

    const thumbnailContainer = thumbnailsRef.current;
    const activeThumb = thumbnailContainer.children[activeImageIndex];
    if (!activeThumb) return;

    const containerWidth = thumbnailContainer.offsetWidth;
    const thumbWidth = activeThumb.offsetWidth;
    const scrollPosition = activeThumb.offsetLeft - (containerWidth / 2) + (thumbWidth / 2);

    thumbnailContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [activeImageIndex, images.length]);

  const swipeToImage = useCallback((swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  }, [imageCount]);

  const dragEndHandler = useCallback((dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  }, [swipeToImage]);

  const skipToImage = useCallback((imageId) => {
    let changeDirection;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection]);
  }, [activeImageIndex]);

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
  };

  const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04]
  };

  return (
    <Main>
      <div className="slider-container">
        <div className="slider">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              style={{
                backgroundImage: `url(${images[activeImageIndex].image})`
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
      </div>

      <div className="thumbnails" ref={thumbnailsRef}>
        {images.map((image, index) => (
          <Thumbnail
            key={image.id}
            image={image}
            isActive={index === activeImageIndex}
            onClick={() => skipToImage(index)}
          />
        ))}
      </div>
    </Main>
  );
});

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
      border-radius: 10px;

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
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        will-change: transform, opacity;
        background-color: #00000018;
        &:hover {
          cursor: grab;
        }
    
        &:active {
          cursor: grabbing;
        }
      }
    }
  }   

  .thumbnails {
    display: flex;
    justify-content: start;
    overflow-x: auto;
    overflow-y: hidden;
    width: 500px;
    padding: 5px 10px;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-cl) #e0e0e0;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #e0e0e0;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #f9a826;
      border-radius: 10px;
    }

    @media only screen and (max-width: 555px) {
      width: 96%;
    }

    .thumbnail-container {
      position: relative;
      width: 120px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #00000018;
      border-radius: 10px;
      height: 100px;
      flex: 0 0 auto;
      margin-right: 5px;
      transition: all 0.3s ease;

      &.active-thumb {
        transform: scale(1.05);
      }

      &:hover {
        cursor: pointer;
      }

      img {
        height: 100%;
        width: 100px;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
      }
    }
  }
`;

export default Carousel;
