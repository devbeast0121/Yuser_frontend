/*
            WouldPutOver()
            @pure
            Used to grey out gift options that would put gifter over max gift limit
            July 31st 2021
            William Doyle
        */
export default function WouldPutOver(desiredGift, currentAmount, max = 1000) {
    if (desiredGift + currentAmount > max)
        return true;
    return false;
}