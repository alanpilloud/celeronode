let flags = {
  referenceSpeed: {
    code: 0x00,
    name: "Reference Speed",
    unit: "rpm",
    type: "Int32",
    readOnly: false
  },
  actualSpeed: {
    code: 0x01,
    name: "Actual speed",
    unit: "rpm",
    type: "Int32",
    readOnly: true
  },
  measuredDCLinkCurrent: {
    code: 0x02,
    name: "Measured dc-link current",
    unit: "mA",
    type: "Int16",
    readOnly: true
  },
  currentReference: {
    code: 0x03,
    name: "Current reference",
    unit: "mA",
    type: "Int16",
    readOnly: true
  },
  temperature: {
    code: 0x04,
    name: "Temperature",
    unit: "°C",
    type: "Int16",
    readOnly: true
  },
  DCLinkVoltage: {
    code: 0x05,
    name: "Dc-link voltage",
    unit: "V",
    type: "Int16",
    readOnly: true
  },
  outputPower: {
    code: 0x06,
    name: "Output power",
    unit: "W",
    type: "Int16",
    readOnly: true
  },
  motorTemperatureTHC: {
    code: 0x07,
    name: "Motor temperature (THC)",
    info: "Not available on CC-100-1000",
    unit: "°C",
    type: "Int16",
    readOnly: true
  },
  motorTemperaturePTC: {
    code: 0x08,
    name: "Motor temperature (PTC)",
    unit: "°C",
    type: "Int16",
    readOnly: true
  },
  polePairs: {
    code: 0x09,
    name: "Pole pairs",
    unit: "#",
    type: "Uint16",
    readOnly: false
  },
  maxPhaseCurrent: {
    code: 0x0a,
    name: "Max. phase current",
    unit: "mA",
    type: "Int32",
    readOnly: false
  },
  maxRotationalSpeed: {
    code: 0x0b,
    name: "Max. rotational speed",
    unit: "rpm",
    type: "Int32",
    readOnly: false
  },
  synchronizationCurrent: {
    code: 0x0c,
    name: "Synchronization current",
    unit: "mA",
    type: "Uint16",
    readOnly: false
  },
  axialMomentOfInertia: {
    code: 0x0d,
    name: "Axial moment of inertia",
    unit: "kgm^2",
    type: "float",
    readOnly: false
  },
  PMFluxLinkage: {
    code: 0x0e,
    name: "PM flux linkage",
    unit: "Vs",
    type: "float",
    readOnly: false
  },
  phaseInductance: {
    code: 0x0f,
    name: "Phase inductance",
    unit: "H",
    type: "float",
    readOnly: false
  },
  phaseResistance: {
    code: 0x10,
    name: "Phase resistance",
    unit: "Ohm",
    type: "float",
    readOnly: false
  },
  rotationDirection: {
    code: 0x11,
    name: "Rotation direction",
    unit: "bool",
    type: "Uint16",
    readOnly: false
  },
  accelerationRatioAboveSync: {
    code: 0x12,
    name: "Acc. ratio (above sync.)",
    unit: "rpm/s",
    type: "float",
    readOnly: false
  },
  accelerationRatioBelowSync: {
    code: 0x13,
    name: "Acc. ratio (below sync.)",
    unit: "rpm/s",
    type: "float",
    readOnly: false
  },
  speedControllerRiseTime: {
    code: 0x14,
    name: "Speed controller rise time",
    unit: "s",
    type: "float",
    readOnly: false
  },
  userDefinedSyncSpeed: {
    code: 0x15,
    name: "User defined sync. speed",
    unit: "rpm",
    type: "Uint16",
    readOnly: false
  },
  defaultLowerSyncSpeed: {
    code: 0x16,
    name: "Default sync speed (lower)",
    unit: "rpm",
    type: "Int32",
    readOnly: true
  },
  defaultUpperSyncSpeed: {
    code: 0x17,
    name: "Default sync speed (upper)",
    unit: "rpm",
    type: "Int32",
    readOnly: true
  },
  userDefinedUpperSyncSpeed: {
    code: 0x18,
    name: "User defined sync speed (lower)",
    unit: "rpm",
    type: "Int32",
    readOnly: false
  },
  userDefinedUpperSyncSpeed: {
    code: 0x19,
    name: "User defined sync speed (upper)",
    unit: "rpm",
    type: "Int32",
    readOnly: false
  },
  userDefinedControlParameter: {
    code: 0x1a,
    name: "User defined control parameter",
    unit: "bool",
    type: "Uint16",
    readOnly: false
  },
  proportionalSpeedGain: {
    code: 0x1b,
    name: "Proportional speed gain",
    unit: "-",
    type: "float",
    readOnly: false
  },
  integralSpeedGain: {
    code: 0x1c,
    name: "Integral speed gain",
    unit: "-",
    type: "float",
    readOnly: false
  }
};

module.exports = flags;
