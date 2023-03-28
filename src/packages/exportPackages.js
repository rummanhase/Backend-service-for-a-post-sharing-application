const mongoose = require('mongoose');
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt  =require('bcrypt')
const JWT_SECRET = 'mysecret'
module.exports = {
    mongoose,
    express,
    jwt,
    bcrypt,
    JWT_SECRET
}