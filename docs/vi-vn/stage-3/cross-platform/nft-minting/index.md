# Cách nhanh chóng phát triển và铸造 NFT——Phiên bản Bắt tay trong 10 phút

# Chương 1: NFT và Smart Contract là gì

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng kín: từ zero viết một smart contract NFT, triển khai nó lên Sepolia testnet,铸造NFT của riêng bạn, và xem nó trên OpenSea. Toàn bộ quá trình sử dụng công cụ trực tuyến trong trình duyệt, không cần cài đặt bất kỳ môi trường local nào, có thể hoàn thành trong 10 phút.

Để tham gia hướng dẫn này, bạn cần ít nhất:

- Trình duyệt Chrome (cài đặt plugin ví MetaMask)
- Một tài khoản ví MetaMask
- Một chút ETH Sepolia testnet (lấy miễn phí, hướng dẫn dưới đây)

> **Zero chi phí, zero cấu hình**: Toàn bộ sử dụng công cụ trực tuyến trong trình duyệt (Remix IDE), không cần cài đặt Node.js / Hardhat; mã code sử dụng template an toàn chính thức từ OpenZeppelin; sau khi铸造có thể xem NFT của bạn trên OpenSea testnet.

## 1.1 NFT là gì?

NFT (Non-Fungible Token, Token không thay thế được) là một loại tài sản kỹ thuật số trên blockchain. Khác với Bitcoin, Ether và các token "có thể thay thế", mỗi NFT đều là duy nhất——giống như không có hai bức tranh nào hoàn toàn giống nhau trên thế giới.

Bạn có thể hiểu NFT là **"chứng chỉ sở hữu trong thế giới kỹ thuật số"**. Nó có thể đại diện cho:

* Quyền sở hữu một tác phẩm nghệ thuật kỹ thuật số
* Một vé tham dự sự kiện
* Một vật phẩm trong trò chơi
* Một chứng chỉ học tập
* Thậm chí là một bài tweet

Giá trị cơ bản của NFT là: **Nó sử dụng công nghệ blockchain để chứng minh "vật phẩm kỹ thuật số này thuộc về bạn", và chứng minh này công khai, minh bạch, không thể thay đổi.**

## 1.2 Smart Contract là gì?

Smart contract (Hợp đồng thông minh) là một đoạn mã chương trình chạy trên blockchain. Bạn có thể hiểu nó là **"hợp đồng tự động thực thi"**——một khi được triển khai lên blockchain, nó sẽ tự động chạy theo logic mã, không ai có thể sửa đổi.

NFT được tạo và quản lý thông qua smart contract. Khi bạn "铸造" (Mint) một NFT, thực tế là gọi một hàm trong smart contract, để nó ghi lại trên blockchain: "NFT số #0 thuộc về địa chỉ ví của bạn".

Chúng ta sẽ sử dụng ngôn ngữ **Solidity** để viết smart contract. Đừng lo, với template có sẵn từ OpenZeppelin, bạn chỉ cần viết khoảng 15 dòng code.

## 1.3 Chúng ta sẽ铸造NFT gì?

Chúng ta sẽ铸造một NFT **"Vibe Coder Learning Certificate"**——chứng minh bạn đã hoàn thành hướng dẫn này, nắm vững kỹ năng cơ bản về phát triển blockchain. NFT này sẽ:

* Sở hữu một số hiệu độc nhất (Token ID)
* Được ghi lại trên Sepolia testnet của Ethereum
* Có thể xem và trưng bày trên OpenSea testnet
* (Tùy chọn) Kèm theo một hình ảnh do bạn tùy chỉnh

Tất nhiên, bạn cũng có thể thay đổi nó thành chủ đề yêu thích——một bức tranh do AI tạo, một thẻ kỷ niệm sự kiện, một avatar pixel……Nội dung của NFT hoàn toàn do bạn quyết định.

## 1.4 Tại sao lại dùng testnet?

Ethereum có sự phân chia giữa "mainnet" và "testnet":

| So sánh | Mainnet | Sepolia Testnet |
|---------|---------|-----------------|
| Giá trị ETH | Tiền thật | Miễn phí lấy, không có giá trị thực |
| Chi phí triển khai | Phải chi tiền thật (Gas fee) | Hoàn toàn miễn phí |
| Trường hợp sử dụng | Phát hành chính thức | Học tập, kiểm tra, phát triển |
| Khác biệt chức năng | Không | Hoàn toàn giống mainnet |

Testnet và mainnet có chức năng hoàn toàn giống nhau, sự khác biệt duy nhất là ETH trên testnet không có giá trị thực. Vì vậy chúng ta có thể yên tâm học tập và thử nghiệm trên testnet, không cần lo lắng về tiền.

## 1.5 Lộ trình của hướng dẫn này

Chúng ta sẽ hoàn thành toàn bộ quy trình theo các bước sau:

1. **Chuẩn bị ví và token kiểm tra** (2 phút): Cài đặt MetaMask, lấy ETH kiểm tra miễn phí
2. **Viết và triển khai smart contract** (4 phút): Viết NFT contract trong Remix IDE và triển khai lên Sepolia
3. **铸造NFT và xem kết quả** (4 phút): Gọi contract để铸造NFT, xác minh trên OpenSea và Etherscan
4. **Nâng cao: Thêm hình ảnh vào NFT** (tùy chọn): Sử dụng IPFS để lưu trữ hình ảnh, làm cho NFT hoàn chỉnh hơn

# Chương 2: Chuẩn bị Ví và Token Kiểm tra (2 phút)

## 2.1 Cài đặt ví MetaMask

MetaMask là ví Ethereum phổ biến nhất, nó là một plugin trình duyệt cho phép bạn tương tác với các ứng dụng trên blockchain.

1. Mở trình duyệt Chrome, truy cập [trang web chính thức MetaMask](https://metamask.io/)
2. Nhấp vào **"Download"**, cài đặt plugin Chrome
3. Sau khi cài đặt xong, nhấp vào biểu tượng cáo MetaMask ở góc trên bên phải của trình duyệt
4. Chọn **"Create a new wallet"** (Tạo ví mới), đặt mật khẩu
5. **Quan trọng**: Lưu giữ cẩn thận cụm từ khôi phục của bạn (12 từ tiếng Anh). Mất ví testnet không sao, nhưng hình thành thói quen tốt là rất quan trọng

## 2.2 Chuyển đổi sang Sepolia testnet

MetaMask mặc định kết nối với mainnet Ethereum. Chúng ta cần chuyển sang Sepolia testnet:

1. Nhấp vào menu thả xuống mạng ở đầu MetaMask (mặc định hiển thị "Ethereum Mainnet")
2. Nhấp vào **"Show test networks"** (Hiển thị mạng kiểm tra)
3. Chọn **"Sepolia test network"**

Nếu không thấy tùy chọn Sepolia, nhấp vào **"Add network"**, thêm thủ công:

| Mục cấu hình | Giá trị |
|-------------|---------|
| Network Name | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Currency Symbol | SepoliaETH |
| Block Explorer | `https://sepolia.etherscan.io` |

## 2.3 Lấy ETH kiểm tra miễn phí

Triển khai hợp đồng và铸造NFT đều cần chi trả phí Gas (phí giao dịch). Trên testnet, phí Gas được thanh toán bằng ETH kiểm tra, hoàn toàn miễn phí.

Truy cập bất kỳ trang web vòi tiền (Faucet) nào dưới đây, nhập địa chỉ ví của bạn, bạn có thể lấy ETH Sepolia miễn phí:

| Faucet | Địa chỉ | Lượng lấy mỗi lần | Có cần đăng nhập |
|--------|---------|------------------|-----------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | Có |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | Có |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | Cần tài khoản Google |

> **Gợi ý**: 0.1 ETH kiểm tra đủ để bạn triển khai hợp đồng +铸造hàng chục NFT. Nếu một vòi không lấy được, hãy thử cái khác.

Sau khi lấy thành công, quay lại MetaMask, bạn sẽ thấy số dư thay đổi từ 0 thành 0.1 ETH (có thể cần đợi vài giây).

# Chương 3: Viết và Triển khai Smart Contract NFT (4 phút)

## 3.1 Mở Remix IDE

Remix là môi trường phát triển smart contract trực tuyến do Ethereum khuyên cáo chính thức, chạy hoàn toàn trong trình duyệt, không cần cài đặt bất kỳ thứ gì.

Mở trình duyệt, truy cập: **https://remix.ethereum.org/**

Bạn sẽ thấy một giao diện giống như VS Code, phía bên trái là quản lý tệp, giữa là trình soạn thảo mã, bên phải là bảng điều khiển biên dịch và triển khai.

## 3.2 Tạo tệp hợp đồng

1. Trong trình quản lý tệp ở bên trái, nhấp vào thư mục **"contracts"**
2. Nhấp vào nút **"+"** ở trên, tạo tệp mới
3. Đặt tên là **`MySimpleNFT.sol`**
4. Dán mã code sau:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Nhập template ERC721 an toàn chính thức từ OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// NFT contract tối giản: chỉ có tên, ký hiệu, chức năng铸造
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // Khởi tạo tên và ký hiệu của bộ sưu tập NFT
    constructor() ERC721("VibeCoder", "VIBE") {}

    // 铸造NFT: gọi để phát hành một cái cho địa chỉ hiện tại
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**Giải thích mã (dưới 15 dòng, dòng nào cũng có thể hiểu):**

| Mã | Ý nghĩa |
|----|---------|
| `pragma solidity ^0.8.20` | Chỉ định phiên bản trình biên dịch Solidity |
| `import "@openzeppelin/..."` | Nhập triển khai ERC721 tiêu chuẩn từ OpenZeppelin (template đã được kiểm toán bảo mật) |
| `contract MySimpleNFT is ERC721` | Tạo một hợp đồng kế thừa tiêu chuẩn ERC721 |
| `ERC721("VibeCoder", "VIBE")` | Tên bộ sưu tập NFT là "VibeCoder", ký hiệu là "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | 铸造một NFT mới cho người gọi |
| `_tokenId++` | Mỗi lần铸造, số hiệu tự động +1 |

> **ERC721 là gì?** Đó là tiêu chuẩn giao thức NFT trên Ethereum, định nghĩa các chức năng cơ bản mà NFT nên có (chuyển nhượng, truy vấn chủ sở hữu, v.v.). OpenZeppelin cung cấp triển khai đã được kiểm toán bảo mật, chúng ta chỉ cần kế thừa, không cần tự viết từ zero.

## 3.3 Biên dịch hợp đồng

1. Nhấp vào **"Solidity Compiler"** (biểu tượng búa) ở bảng bên trái
2. Phiên bản trình biên dịch chọn **0.8.20** (hoặc phiên bản 0.8.x cao hơn)
3. Nhấp vào **"Compile MySimpleNFT.sol"**
4. Thấy dấu kiểm xanh ✅ có nghĩa là biên dịch thành công

> Nếu gặp lỗi, kiểm tra xem phiên bản Solidity có khớp không, đồng thời kiểm tra đường dẫn import OpenZeppelin có chính xác không. Remix sẽ tự động tải xuống phụ thuộc OpenZeppelin từ npm.

## 3.4 Triển khai hợp đồng lên Sepolia testnet

1. Nhấp vào **"Deploy & Run Transactions"** (biểu tượng Ethereum) ở bảng bên trái
2. **Environment** chọn **"Injected Provider - MetaMask"**
   - Điều này sẽ tự động kết nối với ví MetaMask của bạn
   - MetaMask sẽ popup yêu cầu kết nối, nhấp vào **"Connect"** (Kết nối)
3. Xác nhận mạng hiển thị là **Sepolia (11155111)**
4. Hộp thả xuống Contract chọn **MySimpleNFT**
5. Nhấp vào nút **"Deploy"**
6. MetaMask popup xác nhận giao dịch, nhấp vào **"Confirm"** (Xác nhận) (Phí Gas cực thấp, testnet miễn phí)

Đợi vài giây, sau khi triển khai thành công, phần **"Deployed Contracts"** ở phía dưới sẽ hiển thị địa chỉ hợp đồng của bạn. **Sao chép và lưu lại địa chỉ này**, cần dùng sau này để xem NFT.

# Chương 4:铸造NFT và Xem Kết Quả (4 phút)

## 4.1铸造NFT đầu tiên của bạn

Sau khi triển khai thành công, trong vùng **"Deployed Contracts"** ở phía dưới Remix, bạn sẽ thấy bảng điều khiển tương tác của hợp đồng.

1. Mở rộng bảng điều khiển hợp đồng, tìm nút **"mint"** (màu cam)
2. Trực tiếp nhấp vào **"mint"** (không cần nhập bất kỳ tham số nào)
3. MetaMask popup xác nhận giao dịch, nhấp vào **"Confirm"** (Xác nhận)
4. Đợi vài giây, giao dịch hoàn thành

Chúc mừng! Bạn vừa铸造NFT số #0, nó hiện thuộc về địa chỉ ví của bạn.

Bạn có thể tiếp tục nhấp vào "mint" để铸造thêm——mỗi lần铸造, số hiệu NFT sẽ tự động tăng (#1, #2, #3……).

## 4.2 Xác minh kết quả铸造

**Cách 1: Xác minh trong Remix**

Trong bảng điều khiển hợp đồng, tìm hàm **"balanceOf"** (nút xanh), nhập địa chỉ ví của bạn, nhấp để gọi. Nếu trả về `1` (hoặc số lượng bạn đã铸造), có nghĩa là铸造thành công.

Bạn cũng có thể gọi hàm **"ownerOf"**, nhập `0` (Token ID), nó sẽ trả về địa chỉ ví của bạn——chứng minh rằng NFT số #0 thuộc về bạn.

**Cách 2: Xác minh trên Etherscan (Được khuyên dùng)**

1. Mở [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Dán **địa chỉ hợp đồng** của bạn vào ô tìm kiếm
3. Bạn sẽ thấy trang chi tiết hợp đồng, bao gồm tất cả các bản ghi giao dịch
4. Nhấp vào liên kết **"Token Tracker"**, có thể xem tất cả NFT bạn đã铸造

Trên Etherscan, mỗi giao dịch铸造đều có bản ghi hoàn chỉnh: ai đã铸造, khi nào铸造, Token ID là bao nhiêu——đây chính là sức hấp dẫn của blockchain "công khai, minh bạch, không thể sửa đổi".

# Chương 5: Nâng cao——Thêm Hình ảnh vào NFT (Tùy chọn)

Hiện tại NFT chúng ta铸造chỉ có số hiệu, không có hình ảnh và mô tả. Để làm cho NFT hoàn chỉnh hơn, chúng ta cần sử dụng **IPFS** (InterPlanetary File System) để lưu trữ hình ảnh và metadata.

## 5.1 IPFS là gì?

IPFS là một mạng lưu trữ tệp phi tập trung. Khác với lưu trữ đám mây thông thường, các tệp trên IPFS không phụ thuộc vào một máy chủ nào, mà được phân tán trên các nút toàn cầu. Điều này có nghĩa:

* Tệp sẽ không bị mất vì một máy chủ gặp sự cố
* Nội dung tệp được xác định duy nhất bởi giá trị hash, không thể sửa đổi
* Rất phù hợp để lưu trữ hình ảnh và metadata của NFT

## 5.2 Tải hình ảnh lên Pinata

[Pinata](https://pinata.cloud/) là dịch vụ lưu trữ IPFS phổ biến nhất, phiên bản miễn phí cung cấp 1GB dung lượng lưu trữ, đủ để chúng ta sử dụng.

1. Truy cập https://pinata.cloud/, đăng ký một tài khoản miễn phí
2. Đăng nhập, nhấp vào **"Upload"** → **"File"**
3. Chọn tệp bạn muốn làm hình ảnh NFT (có thể sử dụng AI tạo một cái, hoặc tìm bất kỳ hình ảnh nào)
4. Sau khi tải lên thành công, sao chép **CID** của tệp (một chuỗi ký tự giống như `QmXyz...`)

Địa chỉ hình ảnh của bạn là: `ipfs://CID của bạn`

## 5.3 Tạo JSON Metadata

Metadata của NFT là một tệp JSON, mô tả tên, mô tả và địa chỉ hình ảnh của NFT. Tạo tệp `metadata.json`:

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "This NFT certifies that the holder has completed the NFT minting tutorial and entered the world of Web3.",
  "image": "ipfs://CID hình ảnh của bạn",
  "attributes": [
    { "trait_type": "Course", "value": "Easy Vibe" },
    { "trait_type": "Skill", "value": "Smart Contract" },
    { "trait_type": "Level", "value": "Beginner" }
  ]
}
```

Cũng tải `metadata.json` lên Pinata, lấy CID của metadata.

## 5.4 Nâng cấp hợp đồng để hỗ trợ hình ảnh

Để cho NFT mang theo hình ảnh, chúng ta cần nâng cấp một chút hợp đồng, thêm chức năng `tokenURI`. Quay lại Remix, tạo tệp mới `MyNFTWithImage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // 铸造khi truyền vào địa chỉ metadata
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Những cái dưới đây là bắt buộc Solidity phải override
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

Sau khi triển khai, khi gọi `mint` hãy truyền vào địa chỉ metadata của bạn (ví dụ: `ipfs://QmAbc.../metadata.json`), NFT被铸造sẽ mang theo hình ảnh và mô tả.

# Chương 6: Lời kết

Chúc mừng bạn! Bạn đã hoàn thành một vòng kín phát triển NFT từ zero. Hãy nhìn lại những gì chúng ta đã làm:

1. Hiểu được các khái niệm cơ bản về NFT và smart contract
2. Cài đặt ví MetaMask và chuyển sang Sepolia testnet
3. Viết smart contract NFT dưới 15 dòng trong Remix IDE
4. Triển khai hợp đồng lên Sepolia testnet của Ethereum
5. 铸造NFT của riêng bạn và xác minh trên Etherscan
6. (Tùy chọn) Học cách dùng IPFS thêm hình ảnh và metadata vào NFT

Toàn bộ quá trình không cài đặt bất kỳ môi trường local nào, không chi một xu, hoàn toàn trong trình duyệt. Đây chính là sức hấp dẫn của phát triển blockchain——ngưỡng cửa vào thấp hơn bạn tưởng tượng nhiều.

**Hướng phát triển nâng cao:**

* **Sử dụng Hardhat / Foundry phát triển local**: Khi logic hợp đồng của bạn trở nên phức tạp, Remix sẽ không đủ. Hardhat và Foundry là các framework phát triển local chuyên nghiệp, hỗ trợ kiểm tra tự động, triển khai kịch bản, tối ưu hóa Gas, v.v.
* **Thêm danh sách trắng và giới hạn铸造**: Giới hạn ai có thể铸造, mỗi người tối đa有thể铸造bao nhiêu, đặt giá铸造, v.v.
* **Xây dựng trang frontend Mint**: Sử dụng React + ethers.js / viem để xây dựng một trang铸造đẹp, cho phép người dùng铸造NFT một cách dễ dàng từ một trang web
* **Khám phá ERC1155 NFT nhiều phiên bản**: ERC1155 cho phép cùng một Token ID có nhiều bản sao, phù hợp cho vật phẩm trò chơi, vé, v.v.
* **Triển khai lên mainnet**: Khi bạn đã sẵn sàng, triển khai hợp đồng lên Ethereum mainnet (hoặc Polygon, Base và các chuỗi L2 khác, phí Gas thấp hơn)

***NFT đầu tiên của bạn đã trên chuỗi, cánh cửa thế giới blockchain đã mở ra.***

# Tài liệu tham khảo

* [Tài liệu OpenZeppelin ERC721](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Tài liệu chính thức Remix IDE](https://remix-ide.readthedocs.io/)
* [Tài liệu chính thức MetaMask](https://docs.metamask.io/)
* [Tài liệu chính thức Solidity](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Dịch vụ lưu trữ IPFS Pinata](https://pinata.cloud/)
* [Quy chuẩn ERC721 (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
