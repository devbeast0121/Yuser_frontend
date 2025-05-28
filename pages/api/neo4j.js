import neo4j from 'neo4j-driver';

const NEO4J_URL = "bolt://34.68.5.99";
const NEO4J_USERNAME = 'neo4j';
const NEO4J_PASSWORD = 'kFNp6WP9xWnDPH4k';

export async function getSinglePost(pid) {
    const query = `match (p:Post {id: $wantedPostId})<-[r]-(u:User), (pa: Activity {id: $wantedPostId}) where type(r) =~ "POSTED_ON_.*" return p, pa, u`;
    var driver = neo4j.driver(
        NEO4J_URL,
        neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
    )
    const session = driver.session();
    const { records } = await session.run(
        query,
        { wantedPostId: pid }
    )
    session.close()
    driver.close()

    function processPost(post) {
        post.height = Number(post.height);
        post.width = Number(post.width);
        if (post.thumbnail) {                                           //    convert neo4j 2 part number values to normal numbers
            return {
                ...post,
                createdAt: Number(post.createdAt),
                gems: Number(post.gems),
                numGifters: Number(post.numGifters),
                creatorComments: Number(post.creatorComments),
                comments: Number(post.comments),
                _id: post.id,
                thumbnail: `https://yuser.imgix.net/${post.thumbnail}`
            }
        } else if (post.type === "video/mp4") {
            return {
                ...post,
                createdAt: Number(post.createdAt),
                gems: Number(post.gems),
                numGifters: Number(post.numGifters),
                creatorComments: Number(post.creatorComments),
                comments: Number(post.comments),
                _id: post.id,
                thumbnail:
                    "https://image.mux.com/" +
                    post.asset +
                    "/thumbnail.jpg?height=500&width=500"
            }
        } else {                                                      //    convert neo4j 2 part number values to normal numbers
            return {
                ...post,
                createdAt: Number(post.createdAt),
                gems: Number(post.gems),
                numGifters: Number(post.numGifters),
                creatorComments: Number(post.creatorComments),
                comments: Number(post.comments),
                _id: post.id,
                thumbnail: `https://yuser.imgix.net/${post.asset}?fit=clip&w=440&fm=webp$auto=format&dpr=2`
            }

        }
    }

    function injectUser(objToBeInjected, userPayload) {
        return {
            ...objToBeInjected,
            user: {
                uname: userPayload.uname,
                avatar: userPayload.avatar,
            }
        };
    }
    if (records.length === 0) {
        return {
            status: 404,
            message: 'Post not found',
        }
    } else {
        const user = await records[0]['_fields'][2]['properties'];
        const formattedData = {                                                   //    format results to be easily consumed by the client
            fullRecords: records,
            activity: await processPost(records[0]['_fields'][1]['properties']),
            post: await injectUser(processPost(records[0]['_fields'][0]['properties']), user),
        };

        return formattedData;
    }
}


export async function getNFTListings() {
    const query = `match (l:Listing{status:"open"}) where l.start<=$time and l.end>$time 
    match (u:User)-[:CREATED_LISTING]->(l) 
    match (l)-[:LISTS_NFT]->(n:NFT)
    match (n)<-[:MINTED]-(minter:User)
    optional match (n)<-[:REFERENCES_OWNED_TOKEN|REFERENCES_TOKEN]-(refPost:Post) 
    return u.avatar as ownerAvatar,u.uname as ownerName,u.id as ownerId,minter.avatar as minterAvatar,minter.uname as minterName,l.currency as currency, n.asset as content,n.tokenid as id, l.minimum as minBid,refPost as refPost`
    var driver = neo4j.driver(
        NEO4J_URL,
        neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
    )
    const session = driver.session();
    const { records } = await session.run(query, {
        time: neo4j.int(Date.now()),
    });
    session.close();
    driver.close();
    let listings = [];
    if (records.length > 0) {
        for (var record of records) {
            let listing = {}
            listing.authorAvatar = record.get("ownerAvatar");
            listing.authorName = record.get("ownerName");
            listing.minterName = record.get("minterName");
            listing.minterAvatar = record.get("minterAvatar");
            listing.minBid = record.get("minBid").toString();
            listing.id = record.get("id");
            listing.contentDescription = "";
            listing.userId = record.get("ownerId");
            listing.content = record.get("content");
            var user = {
                uname: record.get("ownerName"),
                avatar: listing.authorAvatar = record.get("ownerAvatar")
            }
            listing.user = JSON.stringify(user);

            let refPost = record.get("refPost");
            if (refPost) {
                refPost._id = refPost.id;
                delete refPost["id"];

                refPost = refPost.properties;
                refPost.user = user;
                listing.refPost = JSON.stringify(refPost);
            }
            listings.push(listing);
        }
        return listings;
    }
    return [];
}

export async function getUserCreatedAt(id) {
    let query = `match (u:User{id:$id}) return u.createdAt as createdAt`;
    var driver = neo4j.driver(
        NEO4J_URL,
        neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
    )
    const session = driver.session();
    const { records } = await session.run(query, {
        id: id
    });
    session.close();
    driver.close();
    let createdAt = null;
    if (records[0]) {
        createdAt = records[0].get("createdAt").toNumber();

    }
    return createdAt
}