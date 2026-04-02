import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    extreme_load: {
      executor: "constant-arrival-rate",
      rate: 5000,
      timeUnit: "1s",
      duration: "10s",
      preAllocatedVUs: 1000,
      maxVUs: 4000,
    },
  },
};

// Static content for variety
const tagsPool = Array.from({ length: 100 }, (_, i) => `tag_${i + 1}`);
const contentPool = Array.from(
  { length: 100 },
  (_, i) =>
    `Real load test content line ${i + 1}. System checking Kafka throughput.`,
);
const typesPool = [
  "title",
  "heading",
  "paragraph",
  "image",
  "video",
  "bullets",
];

export function setup() {
  const url = "http://localhost:8001/api/v1/auth/all-users";
  const res = http.get(url);

  if (res.status !== 200) {
    console.log(`❌ Setup Failed! Status: ${res.status}`);
    return { userIds: ["69b58f2a9bdb0504d9f3f1f4"] }; // Fallback from your JSON
  }

  const resBody = res.json();

  // 🔥 EXACT MAPPING BASED ON YOUR JSON
  // Response structure: resBody.data.users
  const users = resBody.data && resBody.data.users ? resBody.data.users : [];

  if (users.length === 0) {
    console.log(
      "⚠️ WARNING: No users found in response. Check Identity Service DB.",
    );
    return { userIds: ["69b58f2a9bdb0504d9f3f1f4"] };
  }

  // Filter out disabled users if you want real interaction (Optional)
  const ids = users.filter((u) => !u.isDisabled).map((u) => u._id);

  console.log(`✅ Setup Success: ${ids.length} Active User IDs loaded.`);
  return { userIds: ids };
}

export default function (data) {
  // Setup se aayi hui real IDs pick karo
  const authorId =
    data.userIds[Math.floor(Math.random() * data.userIds.length)];

  // Random Blocks Generation
  const numBlocks = Math.floor(Math.random() * 5) + 3;
  const blocks = [];
  for (let i = 0; i < numBlocks; i++) {
    const type = typesPool[Math.floor(Math.random() * typesPool.length)];
    const content = contentPool[Math.floor(Math.random() * 100)];

    blocks.push({
      type: type,
      content: type === "bullets" ? [content, "Next Point"] : content,
      order: i + 1,
      metadata: { width: 1920 },
    });
  }

  const postPayload = JSON.stringify({
    authorId,
    blocks,
    tags: [tagsPool[Math.floor(Math.random() * 100)]],
    visibility: "public",
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(
    "http://localhost:8002/api/v1/post/create",
    postPayload,
    params,
  );

  check(res, {
    "Post API 202": (r) => r.status === 202,
  });
}
