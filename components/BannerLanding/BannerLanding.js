import React from 'react';
import {
    InviteCodeContainer,
    BannerImage
} from './BannerLanding.elements';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';


const BannerLanding = (props) => {
    const router = useRouter()

    const [session, loading] = useSession();

    function linkToLanding() {
        router.push('/landing', null, { shallow: true })
    }

    return (
        <>
            {session ?
                <InviteCodeContainer onClick={linkToLanding}>
                    <BannerImage
                        objectFit="cover"
                        src={"https://yuser-assets.imgix.net/rebl_sale_promo_image_56.png?fit=clip&w=300&auto=format&dpr=2&q=75"}
                    />
                </InviteCodeContainer>
                : null
            }
        </>
    )
}

export default BannerLanding
