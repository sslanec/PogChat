export default async function getCheermotes(apiClient, roomid) {
  return await apiClient.helix.bits.getCheermotes(roomid);
}
