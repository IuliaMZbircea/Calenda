using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
 
public class MongoDbContext
{
    private readonly IMongoDatabase _database;
 
    public MongoDbContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
        _database = client.GetDatabase("YourDatabaseName");
    }
 
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
}