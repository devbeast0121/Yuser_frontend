
const calculateCurrentAmountGifted = gifted_this_session => gifted_by_all => gifted_prev_sessions => {
    return (gifted_this_session ?? 0) + ( gifted_by_all ?? 0) - ( gifted_prev_sessions ?? 0)
}

export default calculateCurrentAmountGifted