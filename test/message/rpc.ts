/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */

import { encodeMessage, decodeMessage, message, bool, string, bytes, uint64 } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface RPC {
  subscriptions: RPC.SubOpts[]
  messages: RPC.Message[]
  control?: ControlMessage
}

export namespace RPC {
  export interface SubOpts {
    subscribe?: boolean
    topic?: string
  }

  export namespace SubOpts {
    export const codec = (): Codec<SubOpts> => {
      return message<SubOpts>({
        1: { name: 'subscribe', codec: bool, optional: true },
        2: { name: 'topic', codec: string, optional: true }
      })
    }

    export const encode = (obj: SubOpts): Uint8ArrayList => {
      return encodeMessage(obj, SubOpts.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): SubOpts => {
      return decodeMessage(buf, SubOpts.codec())
    }
  }

  export interface Message {
    from?: Uint8Array
    data?: Uint8Array
    seqno?: Uint8Array
    topic?: string
    signature?: Uint8Array
    key?: Uint8Array
  }

  export namespace Message {
    export const codec = (): Codec<Message> => {
      return message<Message>({
        1: { name: 'from', codec: bytes, optional: true },
        2: { name: 'data', codec: bytes, optional: true },
        3: { name: 'seqno', codec: bytes, optional: true },
        4: { name: 'topic', codec: string, optional: true },
        5: { name: 'signature', codec: bytes, optional: true },
        6: { name: 'key', codec: bytes, optional: true }
      })
    }

    export const encode = (obj: Message): Uint8ArrayList => {
      return encodeMessage(obj, Message.codec())
    }

    export const decode = (buf: Uint8Array | Uint8ArrayList): Message => {
      return decodeMessage(buf, Message.codec())
    }
  }

  export const codec = (): Codec<RPC> => {
    return message<RPC>({
      1: { name: 'subscriptions', codec: RPC.SubOpts.codec(), repeats: true },
      2: { name: 'messages', codec: RPC.Message.codec(), repeats: true },
      3: { name: 'control', codec: ControlMessage.codec(), optional: true }
    })
  }

  export const encode = (obj: RPC): Uint8ArrayList => {
    return encodeMessage(obj, RPC.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): RPC => {
    return decodeMessage(buf, RPC.codec())
  }
}

export interface ControlMessage {
  ihave: ControlIHave[]
  iwant: ControlIWant[]
  graft: ControlGraft[]
  prune: ControlPrune[]
}

export namespace ControlMessage {
  export const codec = (): Codec<ControlMessage> => {
    return message<ControlMessage>({
      1: { name: 'ihave', codec: ControlIHave.codec(), repeats: true },
      2: { name: 'iwant', codec: ControlIWant.codec(), repeats: true },
      3: { name: 'graft', codec: ControlGraft.codec(), repeats: true },
      4: { name: 'prune', codec: ControlPrune.codec(), repeats: true }
    })
  }

  export const encode = (obj: ControlMessage): Uint8ArrayList => {
    return encodeMessage(obj, ControlMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ControlMessage => {
    return decodeMessage(buf, ControlMessage.codec())
  }
}

export interface ControlIHave {
  topic?: string
  messageIDs: Uint8Array[]
}

export namespace ControlIHave {
  export const codec = (): Codec<ControlIHave> => {
    return message<ControlIHave>({
      1: { name: 'topic', codec: string, optional: true },
      2: { name: 'messageIDs', codec: bytes, repeats: true }
    })
  }

  export const encode = (obj: ControlIHave): Uint8ArrayList => {
    return encodeMessage(obj, ControlIHave.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ControlIHave => {
    return decodeMessage(buf, ControlIHave.codec())
  }
}

export interface ControlIWant {
  messageIDs: Uint8Array[]
}

export namespace ControlIWant {
  export const codec = (): Codec<ControlIWant> => {
    return message<ControlIWant>({
      1: { name: 'messageIDs', codec: bytes, repeats: true }
    })
  }

  export const encode = (obj: ControlIWant): Uint8ArrayList => {
    return encodeMessage(obj, ControlIWant.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ControlIWant => {
    return decodeMessage(buf, ControlIWant.codec())
  }
}

export interface ControlGraft {
  topic?: string
}

export namespace ControlGraft {
  export const codec = (): Codec<ControlGraft> => {
    return message<ControlGraft>({
      1: { name: 'topic', codec: string, optional: true }
    })
  }

  export const encode = (obj: ControlGraft): Uint8ArrayList => {
    return encodeMessage(obj, ControlGraft.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ControlGraft => {
    return decodeMessage(buf, ControlGraft.codec())
  }
}

export interface ControlPrune {
  topic?: string
  peers: PeerInfo[]
  backoff?: bigint
}

export namespace ControlPrune {
  export const codec = (): Codec<ControlPrune> => {
    return message<ControlPrune>({
      1: { name: 'topic', codec: string, optional: true },
      2: { name: 'peers', codec: PeerInfo.codec(), repeats: true },
      3: { name: 'backoff', codec: uint64, optional: true }
    })
  }

  export const encode = (obj: ControlPrune): Uint8ArrayList => {
    return encodeMessage(obj, ControlPrune.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ControlPrune => {
    return decodeMessage(buf, ControlPrune.codec())
  }
}

export interface PeerInfo {
  peerID?: Uint8Array
  signedPeerRecord?: Uint8Array
}

export namespace PeerInfo {
  export const codec = (): Codec<PeerInfo> => {
    return message<PeerInfo>({
      1: { name: 'peerID', codec: bytes, optional: true },
      2: { name: 'signedPeerRecord', codec: bytes, optional: true }
    })
  }

  export const encode = (obj: PeerInfo): Uint8ArrayList => {
    return encodeMessage(obj, PeerInfo.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): PeerInfo => {
    return decodeMessage(buf, PeerInfo.codec())
  }
}
