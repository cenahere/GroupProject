using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyGroupAPI.Models;

namespace MyGroupAPI.Data {
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRoles, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>> {
        public DataContext (DbContextOptions options) : base (options) { }
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<UserRoles> UserRole { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<Message> Messages { get; set; }
        // Admin Panel Tables
        public DbSet<Payment> Payment { get; set; }
        public DbSet<UserClass> UserClass { get; set; }

        public DbSet<UserAttend> UserAttend { get; set; }
        public DbSet<UserPay> UserPay { get; set; }
        public DbSet<UserExam> UserExam { get; set; }
        public DbSet<UserGroup> UserGroup { get; set; }
        public DbSet<UserCity> UserCity { get; set; }
        public DbSet<UserGovernorate> UserGovernorate { get; set; }
        public DbSet<UserCountry> UserCountry { get; set; }
        public DbSet<UserVillage> UserVillage { get; set; }
        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder);
            builder.Entity<UserRoles> (
                userRole => {
                    userRole.HasKey(ur=>new{ur.UserId,ur.RoleId});
                     userRole.HasOne (ur => ur.Role)
                        .WithMany (r => r.UserRoles)
                        .HasForeignKey (ur => ur.RoleId)
                        .IsRequired ();

                    userRole.HasOne (ur => ur.User)
                        .WithMany (u => u.UserRoles)
                        .HasForeignKey (r => r.UserId)
                        .IsRequired ();
                }
            );

            // Messages Relationship

            builder.Entity<Message> ()
                .HasOne (m => m.Sender)
                .WithMany (u => u.MessagesSent)
                .OnDelete (DeleteBehavior.Restrict);

            builder.Entity<Message> ()
                .HasOne (m => m.Recipient)
                .WithMany (u => u.MessagesRecived)
                .OnDelete (DeleteBehavior.Restrict);

            // Admin panel Relationships

            
            // user && userClass
            builder.Entity<User>()
                .HasOne(u=>u.UserClass)
                .WithMany(u=>u.Users)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(uc=>uc.UserClassId);

            // User && userAttend
            builder.Entity<UserAttend>()
                .HasOne(u=>u.User)
                .WithMany(u=>u.UserAttends)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(a=>a.UserId);
            
            // User && userPay
            builder.Entity<UserPay>()
                .HasOne(u=>u.User)
                .WithMany(u=>u.UserPays)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(p=>p.UserId);
            
            // User && userExam
            builder.Entity<UserExam>()
                .HasOne(u=>u.User)
                .WithMany(u=>u.UserExams)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(e=>e.UserId);
            


            // UserAddress
            // User && UserVillages
            builder.Entity<User>()
                .HasOne(v=>v.UserVillage)
                .WithMany(v=>v.Users)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(u=>u.UserVillageId);

            // user && city
            builder.Entity<User>()
                .HasOne(c=>c.UserCity)
                .WithMany(c=>c.Users)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(u=>u.UserCityId);
            
            // User && UserGovernorate
            builder.Entity<User>()
                .HasOne(c=>c.UserGovernorate)
                .WithMany(c=>c.Users)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(u=>u.UserGovernorateId);
            
            

        }

    }
}