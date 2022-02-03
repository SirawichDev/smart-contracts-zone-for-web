pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    mapping(uint => uint) public aa; // slot 0
    mapping(address => uint) public bb; // slot 1

    uint8 public a = 7; // 1 byte
    uint16 public b = 10; // 2 bytes
    address public c = 0x6Aedadf7dF8227ae097Dd1208Af2402Cbe7F0b78; // 20 bytes
    bool d = true; // 1 byte
    uint64 public e = 15; // 8 bytes
    // 32 bytes, all values will be stored in slot 2

    //web3.eth.getStorageAt("0xd32caF6bCA3F6afEEF49c9B4737a777E8770b7F9", 0) // ด้านหลัง คือ slot, ด้านหน้าคือ address ของ Storage
    // 0x 0f 01 6aedadf7df8227ae097dd1208af2402cbe7f0b78 000a 07

    uint256 public f = 200; // 32 bytes -> slot 3
    uint8 public g = 40; // 1 byte -> slot 4
    uint256 public h = 789; // 32 bytes -> slot 5

    constructor() {
        aa[2] = 4;
        aa[3] = 10;

        bb[0x6Aedadf7dF8227ae097Dd1208Af2402Cbe7F0b78] = 100;
    }
}
